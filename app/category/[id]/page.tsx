import CategoryContent from "@/app/components/CategoryContent";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CategoryContent id={id} />;
}
