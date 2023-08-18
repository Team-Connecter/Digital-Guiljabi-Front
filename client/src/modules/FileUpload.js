import axios from "axios";
// import { useEffect } from "react";

export const FileUpload = (file, callback) => {
    if (!file) {
        alert("파일이 없습니다.");
        return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        alert("파일의 크기는 10MB를 넘을 수 없습니다.");
        return;
    }

    const api_url = process.env.REACT_APP_API_URL;

    const filenameDate = new Date().toISOString().slice(0, 10);
    const filenameTime = new Date().toISOString().slice(11, 19);
    const filename = `${filenameDate}_${filenameTime}_${file.name}`;

    const uploadImage = (url) => {
        axios
            .put(url, file, {
                headers: {
                    "Content-Type": file.type
                }
            })
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                    // alert("업로드 완료");
                    callback(url.split("?")[0]);
                }, 2000);
            })
            .catch((err) => console.log(err));
    };

    axios
        .post(
            `${api_url}/api/v1/s3/presigned`,
            {
                image_name: filename
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res) => {
            uploadImage(res.data.presigned_url);
        })
        .catch((err) => console.log(err));
};
