import React from "react";
import styles from "../../../styles/modules/Detail.module.css";

export const TopBar = ({ contents, modifyPost, deletePost }) => {
    return (
        <section className={styles.header}>
            <div>
                {contents.thumbnailUrl && (
                    <div className={styles.header__imageWrapper}>
                        <img src={contents.thumbnailUrl} alt="이미지" />
                    </div>
                )}

                <h1 className={styles.header__title}>{contents.title}</h1>
            </div>
            <div className={styles.header__profile}>
                <img src={contents.writerProfileUrl} alt="이미지 영역" />
                <label>
                    <strong>{contents.writerName}</strong>{" "}
                </label>
                <label>{contents.updateAt} </label>
            </div>

            {contents.isMine ? (
                <>
                    <button className="button" onClick={modifyPost}>
                        수정
                    </button>
                    <button className="button" onClick={deletePost}>
                        삭제
                    </button>
                </>
            ) : null}
        </section>
    );
};
