import { useNavigate } from "react-router-dom";

import styles from "../../styles/modules/NotFound.module.css";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <main className={`content-area__main ${styles.main}`}>
            <h1>페이지를 찾을 수 없습니다.</h1>
            <p>
                주소가 잘못되었거나, 내용이 다른 곳으로 옮겨졌을 수 있습니다.
                <br />
                걱정하지 마세요! 이전 페이지나 홈으로 안내해 드리겠습니다.
            </p>
            <p>
                {window.history.length > 1 ? (
                    <button
                        id="goPrev"
                        className="button primary"
                        onClick={() => navigate(-1)}
                    >
                        이전 페이지로 돌아가기
                    </button>
                ) : null}
                <button
                    className="button primary"
                    onClick={() => navigate("/")}
                >
                    홈으로 나가기
                </button>
            </p>
        </main>
    );
};
