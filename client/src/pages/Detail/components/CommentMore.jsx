import React from "react";

export const CommentMore = ({ handleMoreClick }) => {
    return (
        <div>
            <button className="button" onClick={handleMoreClick}>댓글 더보기</button>
        </div>
    );
};
