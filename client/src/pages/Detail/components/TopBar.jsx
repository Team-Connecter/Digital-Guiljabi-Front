import React from "react";

export const TopBar = ({ contents, modifyPost, deletePost }) => {
    return (
        <div>
            {contents.thumnailUrl && <img src={contents.thumbnailUrl} />}
            <h1>{contents.title}</h1>
            <img src={contents.writerProfileUrl} />
            <label>{contents.writerName}</label>
            <label>{contents.updateAt}</label>
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
        </div>
    );
};
