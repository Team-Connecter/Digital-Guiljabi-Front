import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/modules/Login.module.css";
import naver from "../../assets/naver_login.png";
import kakao from "../../assets/kakao_login.png";

import axios from "axios";

export const Login = () => {
    // 로그인 상태를 체크 후, 로그인 상태일 시 /my로 이동
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const api_url = process.env.REACT_APP_API_URL;
        axios
            .get(`${api_url}/api/v1/token/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("response: ", response);
                if (response.data.isTokenValid) {
                    navigate("/my");
                }
            })
            .catch((error) => {
                console.error("Error 발생 : ", error);
            });
    }, [navigate]);

    const getLogin = async (social) => {
        const api_url = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(
                `${api_url}/api/auth/${social}/login-url`
            );
            let loginUrl = response.data.loginUrl;
            console.log("loginUrl: ", loginUrl);
            loginUrl += `&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;

            window.location.href = loginUrl;
        } catch (error) {
            console.error("Error 발생 (로그인): ", error);
        }
    };

    return (
        <main className="content-area__main">
            <h1>로그인 및 회원가입</h1>
            <div className={styles.section}>
                <p className={styles.notice}>
                    회원으로 로그인하면 좋아요와 즐겨찾기를 남기거나, <br />
                    직접 도움말 집필에 참여할 수 있습니다.
                </p>
                <div
                    className={`button ${styles.button} kakao-login`}
                    onClick={() => getLogin("kakao")}
                >
                    <img src={kakao} alt="카카오 로그인 버튼" />
                </div>
                <div
                    className={`button ${styles.button} naver-login`}
                    onClick={() => getLogin("naver")}
                >
                    <img src={naver} alt="네이버 로그인 버튼" />
                </div>
                <p class={styles.terms}>
                    처음 로그인하여 회원가입을 진행하면
                    <br />
                    <Link to="/policy">이용 약관</Link>과{" "}
                    <Link to="/privacy">개인정보 처리방침</Link>에 동의하게
                    됩니다.
                </p>
            </div>
        </main>
    );
};
