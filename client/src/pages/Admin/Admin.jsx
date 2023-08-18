import { Routes, Route, useLocation } from "react-router-dom";
import {
    Home,
    WaitingPost,
    ReportPost,
    EditPost,
    WaitDetail,
    ReportDetail,
    EditDetail
} from "./pages";
import { useEffect } from "react";
import axios from "axios";

export const Admin = () => {
    const location = useLocation();
    // check admin every routing
    useEffect(() => {
        const api = process.env.REACT_APP_API_URL;

        console.log("======\nadmin page\n======");
        axios
            .get(`${api}/api/v1/token/isadmin`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                if (!res.data.isAdmin) {
                    window.location.href = "/";
                }
            })
            .catch((res) => console.error(res));
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service">
                <Route path="wait" element={<WaitingPost />} />
                <Route path="report" element={<ReportPost />} />
                <Route path="edit" element={<EditPost />} />
                <Route path="wait/:id" element={<WaitDetail />} />
                <Route path="report/:id" element={<ReportDetail />} />
                <Route path="edit/:id" element={<EditDetail />} />
            </Route>
        </Routes>
    );
};
