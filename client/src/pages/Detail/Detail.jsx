import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { Form } from "./components/Form";
import { Source } from "./components/Source";
import { Tag } from "./components/Tag";
import { Action } from "./components/Action";
import { Comments } from "./components/Comments";
import { Write } from "./components/Write";
import { CommentMore } from "./components/CommentMore";

export const Detail = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const [size, setSize] = useState(10);
    const params = useParams();
    const navigate = useNavigate();

    const fetchPostData = useCallback(async () => {
        const header = localStorage.getItem("token")
            ? {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              }
            : {};

        try {
            const response = await axios.get(
                `${api_url}/api/v1/boards/${params.id}`,
                header
            );
            const postDataFromServer = response.data;
            console.log(postDataFromServer);
            setPost(postDataFromServer);
        } catch (error) {
            console.error("Error 발생 (도움말): ", error);
        }
    }, [api_url, params.id]);

    useEffect(() => {
        fetchPostData();
    }, [api_url, params.id, fetchPostData]);

    useEffect(() => {
        const fetchComments = async () => {
            const header = localStorage.getItem("token")
                ? {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                              "token"
                          )}`
                      }
                  }
                : {};

            try {
                const response = await axios.get(
                    `${api_url}/api/v1/boards/${
                        params.id
                    }/comments?size=${size}&page=${1}`,
                    header
                );
                const commentsData = response.data;
                setComments(commentsData.comments);
            } catch (error) {
                console.error("Error 발생 (댓글 불러오기): ", error);
            }
        };

        fetchComments();
    }, [comments, api_url, params.id, size]);

    const handleCommentSubmit = async (commentText) => {
        const newComment = {
            content: commentText
        };

        try {
            const response = await axios.post(
                `${api_url}/api/v1/boards/${params.id}/comments`,
                newComment,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const addedComment = response.data;
            setComments((prevComments) => [...prevComments, addedComment]);
        } catch (error) {
            console.error("Error 발생 (댓글 작성): ", error);
        }
    };

    const handleDeleteComment = async (commentPk) => {
        try {
            if (window.confirm("해당 댓글을 정말 삭제하시겠습니까?")) {
                await axios.delete(`${api_url}/api/v1/comments/${commentPk}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                alert("삭제되었습니다.");
            } else {
                alert("삭제를 취소합니다.");
            }
        } catch (error) {
            console.error("Error 발생 (댓글 삭제): ", error);
            alert("작성자가 아니면 댓글을 삭제할 수 없습니다!");
        }
    };

    const handleModifyPost = () => {
        navigate(`/posting/${params.id}`);
    };
    const handleDeletePost = async () => {
        try {
            if (window.confirm("해당 도움말을 정말 삭제하시겠습니까?")) {
                await axios.delete(`${api_url}/api/v1/boards/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                alert("삭제되었습니다.");
            } else {
                alert("삭제를 취소합니다.");
            }
        } catch (error) {
            console.error("Error 발생 (도움말 삭제): ", error);
            alert("작성자가 아니면 도움말을 삭제할 수 없습니다!");
        }
    };

    const handleRequest = () => {
        navigate(`/request/${params.id}`);
    };

    const toggleLike = async () => {
        try {
            if (post.isLiked) {
                await axios.delete(
                    `${api_url}/api/v1/boards/${params.id}/likes`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
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
                            )}`
                        }
                    }
                );
            }
            fetchPostData();
        } catch (error) {
            console.error("Error 발생 (좋아요) : ", error);
        }
    };

    const toggleBookmark = async () => {
        try {
            if (post.isBookmarked) {
                await axios.delete(
                    `${api_url}/api/v1/boards/${params.id}/bookmarks`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
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
                            )}`
                        }
                    }
                );
            }
            fetchPostData();
        } catch (error) {
            console.error("Error 발생 (즐겨찾기) : ", error);
        }
    };

    const handleMoreClick = () => {
        setSize(size + 10);
    };

    return (
        <div>
            {post === null ? (
                <main className="content-area__main">
                    <p>불러오는 중입니다.</p>
                </main>
            ) : (
                <main className="content-area__main">
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
                    <CommentMore handleMoreClick={handleMoreClick} />
                </main>
            )}
        </div>
    );
};
