import { useNavigate } from "react-router-dom";
import TrendingList from "./components/TrendingList";
import { useEffect } from "react";
import axios from "axios";

export const Home = () => {
    const navigate = useNavigate();
    const exampleTrendingData = [
        {
            id: 1,
            title: "시험용 도움말 1호",
            description: "임시로 작성된 도움말의 설명문입니다.",
            likes: 12,
            category: "건강"
        },
        {
            id: 2,
            title: "시험용 도움말 2호",
            description: "짧게 쓰인 설명문입니다.",
            likes: 23,
            category: "교통"
        },
        {
            id: 3,
            title: "시험용 도움말 3호",
            description: "가짜 도움말입니다.",
            likes: 11,
            category: "전자기기"
        },
        {
            id: 4,
            title: "시험용 도움말 4호",
            description: "설명용 텍스트입니다.",
            likes: 9,
            category: "복지"
        }
    ];

    const checkName = (token) => {
        const api_url = process.env.REACT_APP_API_URL;
        axios.get(`${api_url}/api/v1/users/info/my`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("response: ", response);
                if (response.data.nickname === null) {
                    alert("닉네임을 설정해주세요.")
                    navigate("/my");
                }
            })
            .catch((error) => {
                console.error("Error 발생 (카카오 로그인): ", error);
            });
    }


    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        console.log("code: ", code);
        if (code) {
            const api_url = process.env.REACT_APP_API_URL;
            axios.get(`${api_url}/api/login/kakao?code=${code}&redirectUrl=${process.env.REACT_APP_REDIRECT_URL}`)
                .then((response) => {
                    console.log("response: ", response);
                    localStorage.setItem("token", response.data.token);
                    checkName(response.data.token);
                })
                .catch((error) => {
                    console.error("Error 발생 (카카오 로그인): ", error);
                });
        }
    }, [])

    return (
        <>
            <header className="content-area__header">
                <div>
                    <img src="" alt="디지털 길잡이 로고" />
                </div>
                <h1>디지털 길잡이</h1>
                <p>모두가 기술의 수평선상에 서는 온라인 도움말 프로젝트</p>
                <input
                    className="input primary"
                    type="search"
                    placeholder="알고 싶은 것을 검색해 보세요."
                />
            </header>
            <main className="content-area__main">
                <section>
                    <h2>인기 있는 게시글</h2>
                    <TrendingList trendingData={exampleTrendingData} />
                    <button
                        className="button primary"
                        onClick={() => navigate("/search")}
                    >
                        더 찾아보기
                    </button>
                </section>
                <section>
                    <h2>디지털 길잡이는 어떤 프로젝트인가요?</h2>
                    <p>2023년, (중략)</p>
                </section>
            </main>
        </>
    );
};
