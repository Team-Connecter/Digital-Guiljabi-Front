import { useState } from "react";

import axios from "axios";

export const WaitDialog = ({ close, id }) => {
    const [reason, setReason] = useState("");
    const reject = (r) => {
        const api = process.env.REACT_APP_API_URL;
        axios
            .post(
                `${api}/api/v1/admin/boards/${id}/reject`,
                { rejReason: r },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then((res) => {
                alert("거부되었습니다.");
                window.location.href = "/admin/service/wait";
            })
            .catch((err) => console.error(err));
    };

    return (
        <section className="dialog-section">
            <div className="dialog">
                <div className="dialog-close" onClick={close}>
                    ✕
                </div>
                <div className="dialog-header">거부 사유 입력</div>
                <div className="dialog-body">
                    <textarea
                        className="textarea"
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="거부 사유를 입력해주세요."
                    ></textarea>
                </div>
                <div className="dialog-footer detail-footer">
                    <button
                        className="button"
                        onClick={() => {
                            reject(reason);
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </section>
    );
};
