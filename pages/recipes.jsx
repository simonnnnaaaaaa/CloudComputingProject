import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';

const RecipesPage = () => {
    const router = useRouter();
    const { ingredients } = router.query;

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!ingredients) return;

        const fetchRecipes = async () => {
            try {
                const response = await fetch(`/api/spoonacular?ingredients=${ingredients}`);
                const data = await response.json();

                console.log("🍽 Recipes:", data);
                setRecipes(data);
            } catch (error) {
                console.error("Error retrieving recipes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, [ingredients]);

    if (isLoading) return <Spinner/>

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Recipes:</h2>
            {recipes.length === 0 ? (
                <p>Couldn't find any recipes for the given ingredients.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="border rounded shadow p-2 bg-white flex flex-col justify-between">
                            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-center font-semibold mt-2">{recipe.title}</h3>

                            <a
                                href={`https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block text-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                            >
                                View Recipe →
                            </a>
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
};

export default RecipesPage;
