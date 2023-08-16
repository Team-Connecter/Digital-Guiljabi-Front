import React from "react";
import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
    return (
        <div>
            <img alt="" />
            <h3>
                <Link to={`/detailInfo/${post.boardPk}`}>{post.title}</Link>
            </h3>
            <p>{post.username}</p>
            <p>마지막 수정일: {post.updateAt}</p>
            <p>{post.introduction}</p>
            <div>
                {post.tag && post.tag.length > 0 && (
                    <ul>
                        {post.tag.map((tag, index) => (
                            <li key={index}>#{tag}</li>
                        ))}
                    </ul>
                )}
            </div>
            <p>Likes: {post.likeCnt}</p>
            <p>Bookmarks: {post.bookmarkCnt}</p>
        </div>
    );
};
