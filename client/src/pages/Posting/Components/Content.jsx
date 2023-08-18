import { useState } from "react";

import { FileUpload } from "../../../modules/FileUpload";

export const Content = ({ props }) => {
    const [img, setImage] = useState(null);
    const { no, data, updateData, nextStep, prevStep, addStep } = props;

    const update = (e) => {
        // check if file is uploaded
        if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]));
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
            <div className="content-header">
                <h1>{no}</h1>
                <input
                    className="input"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    value={data.title}
                    onChange={update}
                />
                <input
                    className="input"
                    name="img_url"
                    type="file"
                    onChange={update}
                    value={img}
                />
                <img src={data.img_url} alt="이미지 미리보기" />
            </div>

            <div className="content-body">
                <textarea
                    className="textarea"
                    name="content"
                    value={data.content}
                    onChange={update}
                />
            </div>

            <div className="content-footer">
                <button className="button" onClick={prevStep}>
                    뒤로
                </button>
                {/* <button className="button" onClick={nextStep}>다음</button> */}
                <button className="button" onClick={addStep}>
                    단계 추가
                </button>
                <button className="button" onClick={nextStep}>
                    다음 단계로
                </button>
            </div>
        </div>
    );
};
