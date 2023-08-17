import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { EditDialog } from "./Components/EditDialog";
import "./style.css"
import axios from "axios";

export const EditDetail = () => {
    const { id } = useParams();
    const api = process.env.REACT_APP_API_URL;

    const [data, setData] = useState(null);  
    useEffect(() => {
        axios.get(
            `${api}/api/v1/admin/edit-requests/${id}`,
            // {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [api, id]);


    const [dialog, setDialog] = useState(false);
    const closeDialog = () => setDialog(false);
    const openDialog = () => setDialog(true);

    const ignoreEdit = () => {
        axios.delete(
            `${api}/api/v1/admin/edit-requests/${id}/ignore`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then(res => {
            console.log(res);
            navigator.history.back();
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <section className="container">
            <h1>수정요청을 받은 글</h1>
            <div className="edit-header detail-header">
                <div className="edit-title">
                    <div>제목</div>
                    <div>{data?.title}</div>
                </div>
                <div className="edit-author">
                    <div>글쓴이</div>
                    <div>{data?.writerName}</div>
                </div>
                <div className="edit-requester">
                    <div>수정요청자</div>
                    <div>{data?.reqUserName}</div>
                </div>
                <div className="edit-date">
                    <div>수정요청일</div>
                    <div>{data?.requestTime}</div>
                </div>
            </div>

            <div className="edit-body">
                <div>요청사유</div>
                <div className="edit-reason">
                    {data?.content}
                </div>
            </div>

            <div className="edit-footer detail-footer">
                <button onClick={openDialog}>작성자에게 알리기</button>
                <button onClick={ignoreEdit}>무시하기</button>
            </div>
            {dialog && <EditDialog close={closeDialog} pk={id} />}
        </section>
    )
};