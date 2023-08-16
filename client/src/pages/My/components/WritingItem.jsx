import React from "react";
import { Link } from "react-router-dom";

export const WritingItem = ({ writing }) => {
    return (
        <li className="card">
            <img src={writing.thumbnail} alt="" />
            <h3>
                <Link to={`/detailInfo/${writing.boardPk}`}>
                    {writing.title}
                </Link>
            </h3>
            <p>{writing.updateAt}</p>
            <p>Likes: {writing.likeCnt}</p>
            <p>Books: {writing.bookmarkCnt}</p>
            <p>상태: {writing.status}</p>
        </li>
    );
};
