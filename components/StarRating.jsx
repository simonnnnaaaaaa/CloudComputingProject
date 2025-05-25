import React, { useState, useEffect } from "react";

export default function StarRating({ recipeId, isLoggedIn }) {

    if (!isLoggedIn) return null;

    const [rating, setRating] = useState(0);

    useEffect(() => {
        const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");
        if (savedRatings[recipeId]) {
            setRating(savedRatings[recipeId]);
        }
    }, [recipeId]);

    const handleSetRating = (value) => {
        setRating(value);
        const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");
        savedRatings[recipeId] = value;
        localStorage.setItem("ratings", JSON.stringify(savedRatings));
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleSetRating(star)}
                    aria-label={`${star} star`}
                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-500 transition-colors`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}
