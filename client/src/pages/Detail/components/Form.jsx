import React from "react";

export const Form = ({ contents }) => {
    return (
        <div>
            <h2>{contents.subTitle}</h2>
            {contents.imgUrl && <img src={contents.imgUrl} alt="이미지 영역" />}
            <p>{contents.content}</p>
        </div>
    );
};
