import React from "react";

export const SeeMore = ({ handleMore }) => {
    return (
        <div>
            <button className="button" onClick={handleMore}>
                더보기
            </button>
        </div>
    );
};
