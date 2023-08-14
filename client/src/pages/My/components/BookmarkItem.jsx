import React from "react";
import { Link } from "react-router-dom";

export const BookmarkItem = ({ bookmark }) => {
    return (
        <li>
            <img src={bookmark.thumbnail} alt="" />
            <h3>
                <Link to={`/detailInfo?id=${bookmark.boardPk}`}>
                    {bookmark.title}
                </Link>
            </h3>
            <p>{bookmark.updateAt}</p>
            <p>Likes: {bookmark.likeCnt}</p>
            <p>Books: {bookmark.bookmarkCnt}</p>
        </li>
    );
};
