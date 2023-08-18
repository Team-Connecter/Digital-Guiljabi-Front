import { useNavigate } from "react-router-dom";
import TrendingList from "./components/TrendingList";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import styles from "../../styles/modules/Home.module.css";
import logo from "../../assets/logo.svg";

export const Home = () => {
    const navigate = useNavigate();
    const [popPost, setPopPost] = useState([]);
    useEffect(() => {
        const api = process.env.REACT_APP_API_URL;
        axios
            .get(`${api}/api/v1/boards/popular?pageSize=4&page=1`)
            .then((res) => {
                console.log("res: ", res);
                setPopPost(res.data.list);
            })
            .catch((err) => console.error(err));
    }, []);

    const checkName = useCallback(
        (token) => {
            const api_url = process.env.REACT_APP_API_URL;
            axios
                .get(`${api_url}/api/v1/users/info/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log("response: ", response);
                    if (response.data.nickname === null) {
                        alert("닉네임을 설정해주세요.");
                        navigate("/my");
                    }
                })
                .catch((error) => {
                    console.error("Error 발생 (카카오 로그인): ", error);
                });
        },
        [navigate]
    );

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        const state = new URLSearchParams(window.location.search).get("state");
        console.log("code: ", code);
        console.log("state: ", state);

        const api_url = process.env.REACT_APP_API_URL;
        let loginApi = `${api_url}/api/login`;
        if (state === "") loginApi += `/naver?code=${code}&state=`;
        else if (code)
            loginApi += `/kakao?code=${code}&redirectUrl=${process.env.REACT_APP_REDIRECT_URL}`;
        else return;
        axios
            .get(loginApi)
            .then((response) => {
                console.log("response: ", response);
                localStorage.setItem("token", response.data.token);
                checkName(response.data.token);
            })
            .catch((error) => {
                console.error("Error 발생 (로그인): ", error);
            });
    }, [checkName]);

    const search = useCallback(
        (e) => {
            if (e.key === "Enter") {
                navigate(`/search/${e.target.value}`);
            }
        },
        [navigate]
    );

    return (
        <>
            <header className={`content-area__header ${styles.header}`}>
                <div>
                    <img
                        className={styles.logo}
                        src={logo}
                        alt="디지털 길잡이 로고"
                    />
                </div>
                <h1 className={styles.title}>디지털 길잡이</h1>
                <p>모두가 기술의 수평선상에 서는 온라인 도움말 프로젝트</p>
                <input
                    className={`input primary ${styles.search}`}
                    type="search"
                    placeholder="알고 싶은 것을 검색해 보세요."
                    onKeyDown={search}
                />
            </header>
            <main className="content-area__main">
                <section>
                    <h2>인기 있는 게시글</h2>
                    <TrendingList trendingData={popPost} />
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
