import { createFileRoute, notFound } from "@tanstack/react-router";
import { SilverthornBoatDetail, buildBoatHeadConfig } from "@/components/SilverthornBoatDetail";
import { BOATS_BY_SLUG, BOATS } from "@/data/silverthorn-boats";

export const Route = createFileRoute("/small-boats/$slug")({
  beforeLoad: ({ params }) => {
    if (!BOATS_BY_SLUG[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const boat = BOATS_BY_SLUG[params.slug];
    if (!boat) return {};
    return buildBoatHeadConfig(boat);
  },
  component: BoatPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Boat not found</h1>
        <p className="text-gray-600 mb-4">Browse our full fleet.</p>
        <a href="/small-boats" className="underline">View all small boats</a>
      </div>
    </div>
  ),
});

function BoatPage() {
  const { slug } = Route.useParams();
  const boat = BOATS_BY_SLUG[slug] ?? BOATS[0];
  return <SilverthornBoatDetail boat={boat} />;
}
