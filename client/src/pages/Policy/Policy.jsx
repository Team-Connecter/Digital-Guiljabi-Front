import { useNavigate } from "react-router-dom";

export const Policy = () => {
    const navigate = useNavigate();
    return (
        <main className="content-area__main">
            <h1>이용 약관</h1>
            <p>이용 약관은 현재 준비 중입니다.</p>
        </main>
    );
};
