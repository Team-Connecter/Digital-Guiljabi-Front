import React from "react";

export const Category = ({ handleCategoryChange, categories, handleAll }) => {
    return (
        <div>
            {categories.map((category) => (
                <button
                    className="button"
                    key={category.px}
                    onClick={() => handleCategoryChange(category.pk)}
                >
                    {category.name}
                </button>
            ))}
            <button className="button" onClick={handleAll}>
                전체
            </button>
        </div>
    );
};
