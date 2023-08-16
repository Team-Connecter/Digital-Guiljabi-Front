import React from "react";

export const Form = ({ contents }) => {
    return (
        <div>
            <h3>{contents.subTitle}</h3>
            <img src={contents.imgUrl} alt="설명사진" />
            <p>{contents.content}</p>
        </div>
    );
};
