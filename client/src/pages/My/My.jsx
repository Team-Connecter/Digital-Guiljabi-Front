import { UserInfo } from "./components/UserInfo";
import { UserContent } from "./components/UserContent";
import { useEffect, useState } from "react";
import axios from "axios";

export const My = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState(null);
    const [bookmarkData, setBookmarkData] = useState([]);
    const [writingsData, setWritingsData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/api/v1/users/info/my`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                );
                const userDataFromServer = response.data;
                setUserData(userDataFromServer);
            } catch (error) {
                alert("로그인이 필요합니다.");
                window.location.href = "/login";
                console.error("Error 발생 (유저 데이터) : ", error);
            }
        };

        const fetchBookmarkData = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/api/v1/bookmarks`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                );
                const bookmarkDataFromServer = response.data;
                setBookmarkData(bookmarkDataFromServer.bookmarkResponses);
            } catch (error) {
                console.error("Error 발생 (즐겨찾기 불러오기) : ", error);
            }
        };

        const fetchWritingsData = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/api/v1/boards/my`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                );
                const writingDataFromServer = response.data;
                setWritingsData(writingDataFromServer.list);
            } catch (error) {
                console.error("Error 발생 (작성 글 불러오기) : ", error);
            }
        };

        fetchUserData();
        fetchBookmarkData();
        fetchWritingsData();
    }, [api_url]);

    const saveUser = (editUser) => {
        setUserData({ ...editUser });
    };

    return (
        <main className="content-area__main">
            <h1>내 정보</h1>
            {userData === null ? (
                <p>불러오는 중입니다.</p>
            ) : (
                <UserInfo user={userData} onSave={saveUser} />
            )}
            <UserContent bookmarks={bookmarkData} writings={writingsData} />
        </main>
    );
};
