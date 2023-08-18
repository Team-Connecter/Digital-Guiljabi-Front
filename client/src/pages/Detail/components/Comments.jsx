import React from "react";
import styles from "../../../styles/modules/Detail.module.css";

export const Comments = ({ contents, onDelete }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment__header}>
                <img src={contents.profileUrl} alt="이미지 영역" />
                <label>
                    <strong>{contents.username}</strong>
                </label>
                <label>{contents.createAt}</label>
            </div>
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
