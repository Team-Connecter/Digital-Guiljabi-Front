import "../styles/Footer.css";

import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer__logo">
                <h1>Team-Connecter</h1>
                <p>
                    © 2023 <strong>디지털 길잡이</strong>
                </p>
            </div>
            <div className="footer__links">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/about")}>About</button>
                <button onClick={() => navigate("/contact")}>Contact</button>
                <button onClick={() => navigate("/request")}>Request</button>
                <button onClick={() => navigate("/detailInfo")}>Detail</button>
                <button onClick={() => navigate("/my")}>My</button>
                <button onClick={() => navigate("/search")}>Search</button>
                <button onClick={() => navigate("/admin")}>Admin</button>
                <button onClick={() => navigate("/posting")}>Posting</button>
            </div>
        </footer>
    );
};
