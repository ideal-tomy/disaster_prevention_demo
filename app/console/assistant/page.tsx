import { AssistantView } from "@/components/AssistantView";

export default async function AssistantPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <AssistantView showQ1={params.q !== "0"} />;
}
