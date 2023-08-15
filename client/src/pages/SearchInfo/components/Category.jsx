import React from "react";

export const Category = ({ handleCategoryChange, categories, handleAll }) => {
    return (
        <div>
            {categories.map((category) => (
                <button
                    key={category.px}
                    onClick={() => handleCategoryChange(category.pk)}
                >
                    {category.name}
                </button>
            ))}
            <button onClick={handleAll}>전체</button>
        </div>
    );
};
