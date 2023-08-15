import React from "react";

export const TopBar = ({ contents, modifyPost, deletePost }) => {
    return (
        <div>
            <img src={contents.thumbnailUrl} alt="" />
            <h1>{contents.title}</h1>
            <img src={contents.writerProfileUrl} alt="유저 프로필" />
            <label>{contents.writerName}</label>
            <label>{contents.updateAt}</label>
            <button onClick={modifyPost}>수정</button>
            <button onClick={deletePost}>삭제</button>
        </div>
    );
};
