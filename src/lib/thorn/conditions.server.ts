// Daily Shasta Lake weather + lake level for Thorn.
// Refreshed nightly at 00:00 PST by /api/public/hooks/thorn-conditions and read
// (cached) by the chat handler. Server-only.
import { getAdmin } from "./runtime.server";

const LAT = 40.72;
const LON = -122.32;
/** Shasta Dam crest / full pool elevation in feet. */
const FULL_POOL_FT = 1067;

export type DailyWeather = {
  today?: { date: string; high_f: number; low_f: number; conditions: string; precip_chance: number };
  outlook?: { date: string; high_f: number; low_f: number; conditions: string }[];
};

export type LakeLevel = {
  elevation_ft?: number;
  feet_below_full?: number;
  storage_af?: number;
  as_of?: string;
};

const WMO: Record<number, string> = {
  0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "foggy", 48: "foggy",
  51: "light drizzle", 53: "drizzle", 55: "heavy drizzle", 61: "light rain", 63: "rain",
  65: "heavy rain", 71: "light snow", 73: "snow", 75: "heavy snow", 80: "rain showers",
  81: "rain showers", 82: "heavy rain showers", 95: "thunderstorms", 96: "thunderstorms",
  99: "thunderstorms",
};

export function pstDay(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export async function fetchWeather(): Promise<DailyWeather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=4`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
  const json = (await res.json()) as {
    daily?: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: (number | null)[];
    };
  };
  const d = json.daily;
  if (!d?.time?.length) throw new Error("Open-Meteo: empty forecast");

  const day = (i: number) => ({
    date: d.time[i],
    high_f: Math.round(d.temperature_2m_max[i]),
    low_f: Math.round(d.temperature_2m_min[i]),
    conditions: WMO[d.weather_code[i]] ?? "mixed",
  });

  return {
    today: { ...day(0), precip_chance: d.precipitation_probability_max?.[0] ?? 0 },
    outlook: d.time.slice(1, 4).map((_, i) => day(i + 1)),
  };
}

export async function fetchLakeLevel(): Promise<LakeLevel> {
  const end = pstDay();
  const start = pstDay(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000));
  const url =
    `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA` +
    `&SensorNums=6,15&dur_code=D&Start=${start}&End=${end}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CDEC ${res.status}`);
  const rows = (await res.json()) as {
    SENSOR_NUM: number;
    value: number | string;
    date: string;
  }[];

  const stamp = (s: string) => Date.parse(s.replace(" ", "T")) || 0;

  const latest = (sensor: number) => {
    const list = rows
      .filter((r) => Number(r.SENSOR_NUM) === sensor && Number(r.value) > 0)
      .sort((a, b) => stamp(b.date) - stamp(a.date));
    return list[0];
  };

  const elev = latest(6);
  const stor = latest(15);
  const out: LakeLevel = {};
  if (elev) {
    out.elevation_ft = Math.round(Number(elev.value) * 10) / 10;
    out.feet_below_full = Math.round((FULL_POOL_FT - Number(elev.value)) * 10) / 10;
    out.as_of = elev.date;
  }
  if (stor) out.storage_af = Math.round(Number(stor.value));
  return out;
}

/* --------------------------- read side (chat) --------------------------- */

let cache: { day: string; block: string; at: number } | null = null;

/** Compact prompt block with today's conditions; empty string when unavailable. */
export async function conditionsBlock(): Promise<string> {
  const day = pstDay();
  if (cache && cache.day === day && Date.now() - cache.at < 30 * 60_000) return cache.block;

  let block = "";
  try {
    const admin = await getAdmin();
    const { data } = await admin
      .from("thorn_daily_conditions")
      .select("day, weather, lake")
      .order("day", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      const w = (data.weather ?? {}) as DailyWeather;
      const l = (data.lake ?? {}) as LakeLevel;
      const lines: string[] = [];
      const stale = data.day !== day;
      if (w.today) {
        lines.push(
          `- Weather at Shasta Lake for ${w.today.date}: high ${w.today.high_f}°F, low ${w.today.low_f}°F, ${w.today.conditions}, ${w.today.precip_chance}% chance of precipitation.`,
        );
      }
      if (w.outlook?.length) {
        lines.push(
          `- Next days: ${w.outlook.map((o) => `${o.date} ${o.high_f}/${o.low_f}°F ${o.conditions}`).join("; ")}.`,
        );
      }
      if (l.elevation_ft) {
        lines.push(
          `- Lake level: ${l.elevation_ft} ft elevation${l.feet_below_full !== undefined ? ` (${l.feet_below_full} ft below full pool of ${FULL_POOL_FT} ft)` : ""}${l.storage_af ? `, ${l.storage_af.toLocaleString("en-US")} acre-feet in storage` : ""}${l.as_of ? `, reading from ${l.as_of}` : ""}.`,
        );
      }
      if (lines.length) {
        block =
          `\n\n## TODAY AT SHASTA LAKE (refreshed nightly${stale ? ` — latest reading is from ${data.day}, mention the date` : ""})\n` +
          lines.join("\n") +
          `\n- Source: the Shasta Lake weather report at https://houseboats.com/shasta-lake-info/weather-reports. Share these numbers when a guest asks about today's weather or the lake level, and note conditions can change.`;
      }
    }
  } catch (e) {
    console.error("[thorn] conditions read failed", (e as Error).message);
  }

  cache = { day, block, at: Date.now() };
  return block;
}
