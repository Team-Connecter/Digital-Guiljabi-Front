import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { WaitDialog } from "./Components/WaitDialog";

import "./style.css";

export const WaitDetail = () => {
    const id = useParams().id;
    const [data, setData] = useState(null);

    useEffect(() => {
        const api = process.env.REACT_APP_API_URL;
        axios
            .get(`${api}/api/v1/boards/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const [dialog, setDialog] = useState(false);
    const openDialog = () => setDialog(true);
    const closeDialog = () => setDialog(false);

    const approve = () => {
        const api = process.env.REACT_APP_API_URL;
        axios
            .post(
                `${api}/api/v1/admin/boards/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: {
                        categoryPkList: [2]
                    }
                }
            )
            .then((res) => {
                alert("승인되었습니다.");
                window.location.href = "/admin/service/wait";
            })
            .catch((err) => console.error(err));
    };

    return (
        <section className="container">
            <h1>게시물 승인/거부</h1>
            <div className="wait-header detail-header">
                <div className="wait-title">
                    <div>제목</div>
                    <div>{data?.title}</div>
                </div>
                <div className="wait-author">
                    <div>작성자</div>
                    <div>{data?.writerName}</div>
                </div>
                <div className="wait-category">
                    <div>카테고리</div>
                    <div>
                        {data?.categories.map((category, index) => (
                            <span key={index}>{category}</span>
                        ))}
                    </div>
                </div>
                <div className="wait-hashtag">
                    <div>해시태그</div>
                    <div>
                        {data?.tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="wait-img">
                    <div>대표사진</div>
                    <div>
                        <img src={data?.thumnail} alt="대표사진" />
                    </div>
                </div>
            </div>

            <div className="wait-body detail-header">
                <div className="wait-introduction">
                    <div>소개글</div>
                    <div
                        dangerouslySetInnerHTML={{ __html: data?.introduction }}
                    />
                </div>
                <div className="wait-source">
                    <div>출처</div>
                    <div>
                        {data?.sources.map((source, index) => (
                            <span key={index}>{source}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="wait-footer detail-footer">
                <button className="button" onClick={approve}>
                    승인하기
                </button>
                <button className="button" onClick={openDialog}>
                    거부하기
                </button>
            </div>

            {dialog && <WaitDialog close={closeDialog} id={id} />}
        </section>
    );
};
