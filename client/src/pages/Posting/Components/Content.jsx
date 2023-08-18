import { useRef } from "react";

import { FileUpload } from "../../../modules/FileUpload";
import image from "../../../assets/image.png";

import styles from "../../../styles/modules/Posting.module.css";

export const Content = ({ props }) => {
    const { no, data, updateData, nextStep, prevStep, addStep, delStep } =
        props;

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
        <div>
            <div className={styles["content-header"]}>
                <h1 className={styles["content-title-step"]}>{no}</h1>
                <input
                    className={styles["content-title-input"]}
                    name="title"
                    placeholder="단계 제목을 입력해주세요."
                    value={data.title}
                    onChange={update}
                />
                <div
                    className={styles["content-title-image"]}
                    onClick={() => {
                        input.current.click();
                    }}
                >
                    <img src={image} alt="이미지" />
                </div>
                <input
                    style={{ display: "none" }}
                    className="input"
                    name="img_url"
                    type="file"
                    onChange={update}
                    value={""}
                    ref={input}
                />
            </div>

            <div className={styles["content-body"]}>
                <div className={styles["content-body-img"]}>
                    <img
                        src={data.img_url === "" ? image : data.img_url}
                        alt="이미지 미리보기"
                    />
                </div>
                <textarea
                    className={styles["content-body-content"]}
                    name="content"
                    value={data.content}
                    onChange={update}
                    rows="10"
                />
            </div>

            <div className={styles["content-footer"]}>
                <div>
                    <button className="button" onClick={prevStep}>
                        뒤로
                    </button>
                    {/* <button className="button" onClick={nextStep}>다음</button> */}
                    <button className="button" onClick={addStep}>
                        단계 추가
                    </button>
                    <button className="button" onClick={delStep}>
                        이 단계 삭제
                    </button>
                </div>
                <button className="button primary" onClick={nextStep}>
                    다음 단계로
                </button>
            </div>
        </div>
    );
};
