import React from "react";
import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
    return (
        <div>
            <img src={post.thumbnail} alt="" />
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
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                )}
            </div>
            <p>좋아요: {post.likeCnt}</p>
            <p>북마크: {post.bookmarkCnt}</p>
        </div>
    );
};
