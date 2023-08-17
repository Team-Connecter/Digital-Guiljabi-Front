import React from "react";
import { PostItem } from "./PostItem";

export const PostList = ({ posts }) => {
    return (
        <ul>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <li key={post.id}>
                        <PostItem post={post} />
                    </li>
                ))
            ) : (
                <p>일치하는 게시글이 없습니다.</p>
            )}
        </ul>
    );
};
