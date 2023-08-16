import React from "react";

export const Action = ({
    contents,
    handleRequest,
    toggleLike,
    toggleBookmark
}) => {
    return (
        <div>
            <button className="button" onClick={toggleLike}>
                {contents.isLiked ? "좋아요 취소" : "좋아요"}
            </button>
            <label>{contents.likeCnt}</label>
            <button className="button" onClick={toggleBookmark}>
                {contents.isBookmarked ? "북마크 취소" : "북마크"}
            </button>
            <label>{contents.bookmarkCnt}</label>
            <button className="button" onClick={handleRequest}>
                요청
            </button>
        </div>
    );
};
