import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { ReportInfo } from "./Components/ReportInfo";

import "./style.css"

export const ReportDetail = () => {
    const id = useParams().id;

    const [data, setData] = useState(null);
    useEffect(() => {
        const api = process.env.REACT_APP_API_URL;
        axios.get(`${api}/api/v1/admin/boards/${id}/reports`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                
                setData(res.data);
            })
            .catch(err => console.error(err));
    }, [id])

    const postRemove = () => {
        const api = process.env.REACT_APP_API_URL;
        axios.delete(`${api}/api/v1/boards/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                alert("삭제되었습니다.");
                window.location.href = "/admin/service/report";
            })
            .catch((err) => console.error(err));
    }

    const postUnhide = () => {
        const api = process.env.REACT_APP_API_URL;
        axios.delete(`${api}/api/v1/admin/boards/${id}/reports`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                alert("숨기기 해제되었습니다.");
                window.location.href = "/admin/service/report";
            })
            .catch((err) => console.error(err));
    }

    return (
        <section className="container">
            <h1>신고를 많이 받은 글</h1>

            <div className="report-header">
                <div className="report-title">
                    <div>제목</div>
                    <div>{data?.title}</div>
                </div>
                <div className="report-author">
                    <div>글쓴이</div>
                    <div>{data?.author}</div>
                </div>
            </div>

            <div className="report-body">
                {data?.repList?.map((reason, index) => 
                    <ReportInfo key={index} {...reason} />
                )}
            </div>

            <div className="report-footer">
                <button onClick={postUnhide}>숨기기 해제</button>
                <button onClick={postRemove}>신고글 삭제</button>
            </div>

        </section>
    )
};