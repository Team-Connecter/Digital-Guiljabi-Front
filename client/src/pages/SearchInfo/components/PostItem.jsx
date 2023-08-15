import React from "react";
import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
    return (
        <div>
            <img alt="" />
            <h3>
                <Link to={`/detailInfo/${post.boardPk}`}>{post.title}</Link>
            </h3>
            <p>마지막 수정일: {post.updateAt}</p>
            <p>{post.introduction}</p>
            <p>Likes: {post.likeCnt}</p>
            <p>Bookmarks: {post.bookmarkCnt}</p>
        </div>
    );
};
