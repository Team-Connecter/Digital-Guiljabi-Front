import React, { useState } from "react";

export const Write = ({ submitComments }) => {
    const [comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitComments(comment);
        setComment("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>댓글</h3>
            <textarea
                className="textarea"
                value={comment}
                onChange={handleChange}
                placeholder="댓글을 작성하세요"
                rows={4}
                cols={50}
                required
            />
            <button className="button" type="submit">
                등록
            </button>
        </form>
    );
};
