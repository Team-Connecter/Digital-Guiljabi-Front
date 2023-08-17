import axios from "axios";
import { useEffect } from "react";

export const FileUpload = (file) => {
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

    let imgUrl =
        "https://kr.object.ncloudstorage.com/connecter-image/" + "img_test.png";

    // useEffect(() => {
    //     const api_url = process.env.REACT_APP_API_URL;
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     axios
    //         .post(`${api_url}/api/v1/files`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         })
    //         .then((response) => {
    //             console.log("response: ", response);
    //         })
    //         .catch((error) => {
    //             console.error("Error 발생 (파일 업로드): ", error);
    //         });
    // }, []);

    return imgUrl;
};
