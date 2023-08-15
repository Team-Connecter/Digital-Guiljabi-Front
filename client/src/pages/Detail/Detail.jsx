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

    useEffect(() => {
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
                const userLikedPost = postDataFromServer.userLikedPost;

                setPost({ ...postDataFromServer, liked: userLikedPost });
            } catch (error) {
                console.error("Error 발생 (게시글): ", error);
            }
        };

        fetchPostData();
    }, [api_url, params.id]);

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
    }, [comments, api_url, params.id]);

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
            likeCnt: prevPost.liked
                ? prevPost.likeCnt - 1
                : prevPost.likeCnt + 1,
            liked: !prevPost.liked,
        }));
    };

    const handleBookmark = () => {
        setPost((prevPost) => ({
            ...prevPost,
            bookmarkCnt: prevPost.bookmarked
                ? prevPost.bookmarkCnt - 1
                : prevPost.bookmarkCnt + 1,
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
            console.error("Error 발생 (댓글 삭제): ", error);
        }
    };

    const handleModifyPost = () => {
        console.log("수정버튼 클릭");
    };
    const handleDeletePost = () => {
        if (window.confirm("해당 게시글을 정말 삭제하시겠습니까?")) {
            alert("삭제되었습니다.");
        } else {
            alert("삭제를 취소합니다.");
        }
    };

    const handleRequest = () => {
        navigate(`/request/${params.id}`);
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
