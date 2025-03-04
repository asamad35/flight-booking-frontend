import UserInsightsContainer from "@/components/dashboard/UserInsightsContainer";

export default function UserInsightsPage({
  params,
}: {
  params: { id: string };
}) {
  return <UserInsightsContainer userId={params.id} />;
}
