export default async function handler(req, res) {
  const { ingredients } = req.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!ingredients || !apiKey) {
    return res.status(400).json({ error: 'Lipsesc ingredientele sau cheia API' });
  }

  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${apiKey}`;

    const response = await fetch(url);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return res.status(500).json({ error: "Invalid API key or quota exceeded", details: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error("Eroare Spoonacular:", err);
    return res.status(500).json({ error: 'Eroare la preluarea rețetelor' });
  }
}
