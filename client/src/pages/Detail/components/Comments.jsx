import React from "react";

export const Comments = ({ contents, onDelete }) => {
    return (
        <div>
            <img src={contents.profileUrl} alt="프로필" />
            <label>{contents.username}</label>
            <label>{contents.createAt}</label>
            <p>{contents.content}</p>
            {contents.isMine ? (
                <button
                    className="button"
                    onClick={() => onDelete(contents.commentPk)}
                >
                    삭제
                </button>
            ) : null}
        </div>
    );
};
