import React from "react";
import { PostItem } from "./PostItem";

export const PostList = ({ posts }) => {
    return (
        <ul className="cards">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <li className="card vertical" key={post.id}>
                        <PostItem post={post} />
                    </li>
                ))
            ) : (
                <p>일치하는 도움말이 없습니다.</p>
            )}
        </ul>
    );
};
