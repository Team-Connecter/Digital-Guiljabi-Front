import { FileUpload } from "../../../modules/FileUpload";

import image from "../../../assets/image.png";

import styles from "../../../styles/modules/Posting.module.css";
import { useRef } from "react";

export const Title = ({ props }) => {
    const { data, updateData, nextStep } = props;

    const input = useRef(null);
    const update = (e) => {
        // check if file is uploaded
        if (e.target.files) {
            FileUpload(e.target.files[0], (url) => {
                console.log("url: ", url);
                updateData({
                    ...data,
                    [e.target.name]: url
                });
            });

            return;
        }

        updateData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="title">
            <div>
                <h1>제목 입력</h1>
                <input
                    className="input"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    onChange={update}
                    value={data.title}
                    style={{ width: "100%", marginBottom: "10px" }}
                />
            </div>
            <div>
                <h1>소개말 입력</h1>
                <input
                    className="input"
                    name="content"
                    placeholder="서론(소개말) 입력"
                    onChange={update}
                    value={data.content}
                    style={{ width: "100%", marginBottom: "10px" }}
                />
            </div>
            <div className={styles["title-img"]}>
                <img
                    src={data.img_url === "" ? image : data.img_url}
                    alt="이미지 미리보기"
                    onClick={() => {
                        input.current.click();
                    }}
                />
            </div>
            <input
                className="input"
                name="img_url"
                type="file"
                onChange={update}
                style={{ display: "none" }}
                ref={input}
            />

            <div className={styles["content-footer"]}>
                <div></div>
                <button className="button primary" onClick={nextStep}>
                    다음 단계로
                </button>
            </div>
        </div>
    );
};
