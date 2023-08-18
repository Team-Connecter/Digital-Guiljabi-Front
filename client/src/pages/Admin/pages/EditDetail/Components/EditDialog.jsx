import axios from "axios";

export const EditDialog = ({ close, pk }) => {
    const api = process.env.REACT_APP_API_URL;

    const alertWiring = (state) => {
        state = state ? "nothidden" : "hidden";
        axios
            .post(
                `${api}/api/v1/admin/board/${pk}/edit-request/${state}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then((res) => {
                console.log(res);
                alert("알림이 전송되었습니다.");
                window.location.href = "/admin/service/edit";
                // close();
            })
            .catch((err) => {
                console.error(err);
                alert("알림 전송에 실패했습니다.");
            });
    };

    return (
        <section className="dialog-section">
            <div className="dialog">
                <div className="dialog-close" onClick={close}>
                    ✕
                </div>
                <div className="dialog-header">수정 요청 사항 입력</div>
                <div className="dialog-body">
                    <textarea
                        className="textarea"
                        placeholder="수정 요청 사항을 입력해주세요."
                    />
                </div>
                <div className="dialog-footer detail-footer">
                    <button
                        className="button"
                        onClick={() => alertWiring(true)}
                    >
                        게시글 숨기지 않기
                    </button>
                    <button
                        className="button"
                        onClick={() => alertWiring(false)}
                    >
                        게시글 숨기기
                    </button>
                </div>
            </div>
        </section>
    );
};
