import { useState, useEffect } from "react";
import axios from "axios";
import { TopBar } from "./components/TopBar";
import { Form } from "./components/Form";
import { Source } from "./components/Source";
import { Tag } from "./components/Tag";
import { Action } from "./components/Action";
import { Comments } from "./components/Comments";
import { Write } from "./components/Write";
import { useNavigate, useParams } from "react-router-dom";

export const Detail = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    console.log("게시판", params);
    console.log("게시판", params.id);

    const fetchPostData = async () => {
        try {
            const response = await axios.get(
                `${api_url}/api/v1/boards/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const postDataFromServer = response.data;

            setPost(postDataFromServer);
        } catch (error) {
            console.error("Error 발생 (게시글): ", error);
        }
    };

    useEffect(() => {
        fetchPostData();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/api/v1/boards/${
                        params.id
                    }/comments?size=${10}&page=${1}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                const commentsData = response.data;
                setComments(commentsData.comments);
            } catch (error) {
                console.error("Error 발생 (댓글 불러오기): ", error);
            }
        };

        fetchComments();
    }, [comments]);

    const handleCommentSubmit = async (commentText) => {
        const newComment = {
            content: commentText,
        };

        try {
            const response = await axios.post(
                `${api_url}/api/v1/boards/${params.id}/comments`,
                newComment,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            const addedComment = response.data;
            setComments((prevComments) => [...prevComments, addedComment]);
        } catch (error) {
            console.error("Error 발생 (댓글 작성): ", error);
        }
    };

    const handleLike = () => {
        setPost((prevPost) => ({
            ...prevPost,
            liked: !prevPost.liked,
        }));
    };

    const handleBookmark = () => {
        setPost((prevPost) => ({
            ...prevPost,
            bookmarked: !prevPost.bookmarked,
        }));
    };

    const handleDeleteComment = async (commentPk) => {
        try {
            await axios.delete(`${api_url}/api/v1/comments/${commentPk}`, {
                headers: {
                    Authorization: `Bearers ${localStorage.getItem("token")}`,
                },
            });
            setComments((prevComments) =>
                prevComments.filter(
                    (comment) => comment.commentPk !== commentPk
                )
            );
        } catch (error) {
            console.log(commentPk);
            console.error("Error 발생 (댓글 삭제): ", error);
            alert("작성자가 아니면 삭제할 수 없습니다!");
        }
    };

    const handleModifyPost = () => {
        navigate(`/posting/${params.id}`);
    };
    const handleDeletePost = async () => {
        try {
            if (window.confirm("해당 게시글을 정말 삭제하시겠습니까?")) {
                await axios.delete(`${api_url}/api/v1/boards/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                alert("삭제되었습니다.");
            } else {
                alert("삭제를 취소합니다.");
            }
        } catch (error) {
            console.error("Error 발생 : ", error);
            alert("작성자가 아니면 게시글을 삭제할 수 없습니다!");
        }
    };

    const handleRequest = () => {
        navigate(`/request/${params.id}`);
    };

    const toggleLike = async () => {
        try {
            if (post.liked) {
                await axios.delete(
                    `${api_url}/api/v1/boards/${params.id}/likes`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    `${api_url}/api/v1/boards/${params.id}/likes`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            }

            handleLike();
            fetchPostData();
        } catch (error) {
            console.log("Error 발생 (좋아요) : ", error);
        }
    };

    const toggleBookmark = async () => {
        try {
            if (post.bookmarked) {
                await axios.delete(
                    `${api_url}/api/v1/boards/${params.id}/bookmarks`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    `${api_url}/api/v1/boards/${params.id}/bookmarks`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            }

            handleBookmark();
            fetchPostData();
        } catch (error) {
            console.log("Error 발생 (북마크) : ", error);
        }
    };

    return (
        <div>
            {post === null ? (
                <p>로딩중</p>
            ) : (
                <>
                    <TopBar
                        contents={post}
                        modifyPost={handleModifyPost}
                        deletePost={handleDeletePost}
                    />
                    {post.cards.map((card, index) => (
                        <Form key={index} contents={card} />
                    ))}
                    <h3>출처</h3>
                    {post.sources.map((source, index) => (
                        <Source key={index} contents={source} />
                    ))}
                    {post.tags.map((tag, index) => (
                        <Tag key={index} contents={tag} />
                    ))}
                    <Action
                        contents={post}
                        handleLike={handleLike}
                        handleBookmark={handleBookmark}
                        handleRequest={handleRequest}
                        setPost={setPost}
                        toggleLike={toggleLike}
                        toggleBookmark={toggleBookmark}
                    />
                    <Write submitComments={handleCommentSubmit} />

                    {comments.map((comment) => (
                        <Comments
                            key={comment.commentPk}
                            contents={comment}
                            onDelete={handleDeleteComment}
                        />
                    ))}
                </>
            )}
        </div>
    );
};
