import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "../../../modules/FileUpload";

export const UserInfo = ({ user, onSave }) => {
    const api_url = process.env.REACT_APP_API_URL;
    const [editing, setEditing] = useState(false);
    const [editUser, setEditUser] = useState({ ...user });
    const [profilePicture, setProfilePicture] = useState("");

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        setEditing(false);
        console.log(editUser);
        onSave(editUser);

        if (profilePicture) {
            uploadProfilePicture(profilePicture);
        } else {
            sendUpdateUserInfo(editUser);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            let fr = new FileReader();
            fr.onload = () => {
                onSave({ ...user, imgUrl: fr.result });
            };
            fr.readAsDataURL(file);
            setProfilePicture(file);
        }
    };

    const sendUpdateUserInfo = (updatedUser) => {
        // try {
        //     const response = await axios.patch(
        //         `${api_url}/api/v1/users/info`,
        //         updatedUser,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("token")}`
        //             }
        //         }
        //     );
        // } catch (error) {
        //     console.error("Error 발생 (유저 데이터 수정) : ", error);
        // }

        // 기존코드는 위와 같이 async/await를 사용했지만, 아래와 같이 .then()을 사용하는 것이 더 좋다.
        axios
            .patch(`${api_url}/api/v1/users/info`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                console.log("response: ", response);
            })
            .catch((error) => {
                console.error("Error 발생 (유저 데이터 수정) : ", error);
            });
    };

    const uploadProfilePicture = async (imageFile) => {
        FileUpload(imageFile, (url) => {
            axios
                .post(
                    `${api_url}/api/v1/users/info/profile`,
                    { imgUrl: url },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then((response) => {
                    console.log("response: ", response);
                })
                .catch((error) => {
                    console.error("Error 발생 (프로필 사진) : ", error);
                });

            let newUser = {
                ...user,
                imgUrl: url
            };
            onSave(newUser);
        });
    };

    return (
        <div>
            <div>
                <img src={user.imgUrl} alt="프로필" />
                {editing && (
                    <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileChange}
                    />
                )}
            </div>
            <div>
                <div>
                    <p>
                        닉네임 :{" "}
                        {editing ? (
                            <input
                                className="input"
                                name="nickname"
                                value={editUser.nickname ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            user.nickname ?? ""
                        )}
                    </p>
                </div>
                <div>
                    <p>가입날짜 : {user.joinAt}</p>
                </div>
                <div>
                    <p>
                        1365 아이디 :{" "}
                        {editing ? (
                            <input
                                className="input"
                                name="id1365"
                                value={editUser.id1365 ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            user.id1365 ?? ""
                        )}
                    </p>
                </div>
                <div>
                    <p>
                        VMS 아이디 :{" "}
                        {editing ? (
                            <input
                                className="input"
                                name="idVms"
                                value={editUser.idVms ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            user.idVms ?? ""
                        )}
                    </p>
                </div>
                <div>
                    <p>
                        한줄소개 :
                        {editing ? (
                            <textarea
                                className="textarea"
                                name="introduction"
                                value={editUser.introduction ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            user.introduction ?? ""
                        )}
                    </p>
                </div>
            </div>
            <div>
                {editing ? (
                    <button
                        className="button primary"
                        onClick={handleSaveClick}
                    >
                        저장
                    </button>
                ) : (
                    <button className="button" onClick={handleEditClick}>
                        편집
                    </button>
                )}
            </div>
        </div>
    );
};
