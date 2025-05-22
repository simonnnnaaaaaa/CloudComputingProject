import { useRouter } from 'next/router';

export default function Recipes() {
  const router = useRouter();
  const { ingredients } = router.query;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Cauți rețete pentru:</h2>
      <p className="text-blue-600">{ingredients}</p>
    </div>
  );
}
