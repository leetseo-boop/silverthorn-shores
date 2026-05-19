## Hero video background

Replace the static `heroMarina` image in the home page `Hero()` with an embedded YouTube video (https://youtu.be/ISEDmsezjSM, ID `ISEDmsezjSM`) as a muted, autoplaying, looping background, then layer a glassy overlay so the existing headline + CTAs stay readable.

### Edit
- File: `src/components/SilverthornHomePage.tsx` → `Hero()` only.
- Replace the `<img src={heroMarina} …>` with a full-cover responsive `<iframe>`:
  - `src="https://www.youtube.com/embed/ISEDmsezjSM?autoplay=1&mute=1&loop=1&playlist=ISEDmsezjSM&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3"`
  - Absolutely positioned, sized via `aspect-video` trick: outer wrapper `absolute inset-0 overflow-hidden`, iframe centered with `min-w-full min-h-full w-[177.78vh] h-[56.25vw]` so it always covers (16:9 cover, no letterboxing).
  - `pointer-events-none`, `tabIndex={-1}`, `aria-hidden`, `loading="eager"`.
- Keep `heroMarina` as a CSS background-image on the section so something paints instantly before the iframe loads (no layout shift, no blank screen).
- Add glassy overlay layers above the iframe, below the content:
  1. Dark gradient: `bg-gradient-to-b from-[#0D2030]/55 via-[#0D2030]/35 to-[#0D2030]/70` for legibility.
  2. Subtle frosted tint: a thin `bg-white/5` layer with `backdrop-blur-[2px]` to give the "glassy" sheen without killing the footage.
- Wrap the existing headline/CTA block in a glass card: `rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] px-8 py-10 md:px-12 md:py-14` so the content reads as a frosted panel over the moving video. Keep all current copy, colors, buttons, fonts, and the bottom wave.
- Keep `minHeight: 85vh`, the orange CTA color, Playfair headline, and the existing eyebrow + phone pill exactly as-is.

### Out of scope
- No other sections change. No new dependencies. No routing or data changes. No removal of the existing image asset (kept as instant-paint poster).
