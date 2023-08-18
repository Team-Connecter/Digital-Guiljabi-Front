import React from "react";

export const Form = ({ contents }) => {
    return (
        <div>
            <h3>{contents.subTitle}</h3>
            <img src={contents.imgUrl} />
            <p>{contents.content}</p>
        </div>
    );
};
