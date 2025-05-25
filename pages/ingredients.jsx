import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    router.push(`/recipes?ingredients=${encodeURIComponent(ingredients)}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Generate recipes 🍽️</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter the ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Generate recipes
        </button>
      </form>
    </div>
  );
}
