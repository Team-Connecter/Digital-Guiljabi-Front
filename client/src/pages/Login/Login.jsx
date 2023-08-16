import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <>
            <h1>Login</h1>
            <div className="login-section">
                <div className="kakao-login">
                    <img
                        onClick={() => getLogin("kakao")}
                        src={kakao}
                        alt="카카오 로그인 버튼"
                    />
                </div>
                <div className="naver-login">
                    <img
                        onClick={() => getLogin("naver")}
                        src={naver}
                        alt="네이버 로그인 버튼"
                    />
                </div>
            </div>
        </>
    );
};
