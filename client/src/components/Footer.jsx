import "../styles/Footer.css";
import logo from "../assets/connecter.svg";

import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <img src={logo} alt="커넥터 로고"></img>
            </div>
            <div className="footer__links">
                <p>© 2023 디지털 길잡이</p>
                <p>
                    <Link to="/policy">이용 약관</Link> |{" "}
                    <Link to="/privacy">개인정보 처리방침</Link> |{" "}
                    <a href="mailto:id@domain">문의</a>
                </p>
            </div>
        </footer>
    );
};
