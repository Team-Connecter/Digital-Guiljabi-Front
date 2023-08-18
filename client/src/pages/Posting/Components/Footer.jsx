import { FileUpload } from "../../../modules/FileUpload";

import styles from "../../../styles/modules/Posting.module.css";

export const Footer = ({ props, save }) => {
    const { data, prevStep, updateData } = props;
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
        <div className={styles["footer"]}>
            <div>
                <div>
                    <h1>해시태그 입력</h1>
                    <input
                        className="input"
                        type="#해시태그"
                        name="tags"
                        onChange={update}
                        value={data.tags}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                </div>
                <div>
                    <h1>출처입력</h1>
                    <textarea
                        className="textarea"
                        name="source"
                        onChange={update}
                        value={data.source}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                </div>
            </div>

            <div className={styles["content-footer"]}>
                <button className="button" onClick={prevStep}>
                    뒤로
                </button>
                <button className="button primary" onClick={save}>
                    완료
                </button>
            </div>
        </div>
    );
};
