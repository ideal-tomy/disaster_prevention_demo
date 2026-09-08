import { FacilitiesView } from "@/components/FacilitiesView";

export default async function FacilitiesPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === "shelter" ? "shelter" : "daily";
  return <FacilitiesView view={view} />;
}
