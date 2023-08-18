import React from "react";

export const Form = ({ contents }) => {
    return (
        <div>
            <h3>{contents.subTitle}</h3>
            {contents.imgUrl && <img src={contents.imgUrl} alt="이미지 영역" />}
            <p>{contents.content}</p>
        </div>
    );
};
