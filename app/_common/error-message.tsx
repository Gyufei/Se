export default function ErrorMessage({ error }: { error: string }) {
  if (!error) return null;

  return <div className="text-red text-sm ml-4 mt-[10px]">{error}</div>;
}
