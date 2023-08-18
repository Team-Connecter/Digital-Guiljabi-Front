import "./styles/App.css";
import "./styles/App-fonts.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Detail,
    Home,
    My,
    SearchInfo,
    Admin,
    Posting,
    Request,
    Login,
    Policy,
    Privacy,
    NotFound
} from "./pages";
import { UserLayout } from "./components/Layout/UserLayout";
import { AdminLayout } from "./components/Layout/AdminLayout";

// import "./Firebase";

function App() {
    // 카카오 로그인 구현으로 인한 임시 로그인 삭제
    // useEffect(() => {
    //     const api = process.env.REACT_APP_API_URL;
    //     axios
    //         .post(`${api}/api/login`, {
    //             uid: "admin"
    //         })
    //         .then((res) => {
    //             if (res.data.token)
    //                 localStorage.setItem("token", res.data.token);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="request/:id" element={<Request />} />
                    <Route path="detailInfo/:id" element={<Detail />} />
                    <Route path="request/:id" element={<Request />} />
                    <Route path="detailInfo" element={<Detail />} />
                    <Route path="my" element={<My />} />
                    <Route path="search" element={<SearchInfo />} />
                    <Route path="search/:keyword" element={<SearchInfo />} />
                    <Route path="posting" element={<Posting />} />
                    <Route path="/posting/:id" element={<Posting />} />
                    <Route path="login" element={<Login />} />
                    <Route path="policy" element={<Policy />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path="*" element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
