export const fetchRecipesByIngredients = async (ingredients) => {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const baseUrl = 'https://api.spoonacular.com/recipes/findByIngredients';

    const url = `${baseUrl}?ingredients=${encodeURIComponent(
        ingredients
    )}&number=10&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
};
