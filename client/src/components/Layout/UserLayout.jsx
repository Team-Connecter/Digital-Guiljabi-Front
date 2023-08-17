import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const UserLayout = () => {
    return (
        <>
            <Navbar />
            <div className="content-area">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};
