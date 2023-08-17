import "../styles/Navbar.css";
import logo from "../assets/logo.svg";

import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar__logo" onClick={() => navigate("/")}>
                <img src={logo} alt="디지털 길잡이 로고"></img>
            </div>
            <div className="navbar__links">
                <Link to="/my">내 정보</Link>
                <Link to="/search">검색</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/posting">Posting</Link>
                <Link to="/login">로그인</Link>
            </div>
        </nav>
    );
};
