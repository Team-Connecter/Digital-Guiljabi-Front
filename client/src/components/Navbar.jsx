import "../styles/Navbar.css";
import logo from "../assets/logo.svg";

import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(false);
    const [userprofile, setUserprofile] = useState(
        "https://boonbaebucket.s3.ap-northeast-2.amazonaws.com/point.png"
    );
    const [showAddMenu, setShowAddMenu] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            const api = process.env.REACT_APP_API_URL;
            if (!localStorage.getItem("token")) setIsLogin(false);
            axios
                .get(`${api}/api/v1/users/info/my`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setIsLogin(true);
                    setUserprofile(
                        res.data.imgUrl === null
                            ? "https://boonbaebucket.s3.ap-northeast-2.amazonaws.com/point.png"
                            : res.data.imgUrl
                    );
                })
                .catch((err) => {
                    setIsLogin(false);
                });
        }, 1000);
    }, [location.pathname]);

    useEffect(() => {
        setShowAddMenu(false);
    }, [location.pathname]);

    const logout = () => {
        const api_url = process.env.REACT_APP_API_URL;
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
        axios
            .post(
                `${api_url}/api/logout?logout_redirect_uri=${redirect_uri}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then((res) => {
                localStorage.removeItem("token");
                setIsLogin(false);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo" onClick={() => navigate("/")}>
                <img src={logo} alt="디지털 길잡이 로고" />
            </div>
            <div className="navbar__links">
                {!isLogin ? (
                    <Link to="/login">로그인</Link>
                ) : (
                    <div className="navbar__profile">
                        <img
                            src={userprofile}
                            alt="프로필 사진"
                            onClick={() => {
                                setShowAddMenu(!showAddMenu);
                            }}
                        />
                        {showAddMenu ? (
                            <div className="navbar__addmenu">
                                <div
                                    onClick={() => {
                                        navigate("/my");
                                    }}
                                >
                                    내 정보
                                </div>
                                <div onClick={() => logout()}>로그아웃</div>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </nav>
    );
};
