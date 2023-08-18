import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Content } from "./Components/Content";
import { Title } from "./Components/Title";
import { Footer } from "./Components/Footer";

export const Posting = () => {
    const { id } = useParams();

    // 초기 데이터
    // 1. 타이틀 및 소개글
    // 2. 컨텐츠
    // 3. 해시태그 및 출처
    // 첫 상태는 타이틀 및 소개글
    const [step, setStep] = useState(0);
    const [data, setData] = useState([
        {
            type: "title",
            data: {
                title: "",
                img_url: "",
                content: ""
            }
        },
        {
            type: "content",
            data: {
                title: "",
                img_url: "",
                content: ""
            }
        },
        {
            type: "footer",
            data: {
                tags: "",
                source: ""
            }
        }
    ]);

    const nextStep = () => {
        if (step === data.length - 1) return;
        setStep(step + 1);
    };

    const prevStep = () => {
        if (step === 0) return;
        setStep(step - 1);
    };

    /**
     * 컨텐츠의 단계를 추가하는 함수
     */
    const addStep = () => {
        // 현재 단계의 다음 단계에 content를 추가한다.
        // footer는 항상 마지막에 있어야 하므로, footer는 추가하지 않는다.
        setData([
            ...data.slice(0, step + 1),
            {
                type: "content",
                data: {
                    title: "",
                    img_url: "",
                    content: ""
                }
            },
            ...data.slice(step + 1)
        ]);

        // 단계를 추가하면 바로 다음 단계로 이동한다.
        setStep(step + 1);
    };

    /**
     * 데이터를 업데이트하는 함수
     * @param {*} s 스탭의 단계
     * @param {*} d 업데이트할 데이터
     */
    const updateData = (s, d) => {
        setData([
            ...data.slice(0, s),
            {
                ...data[s],
                data: d
            },
            ...data.slice(s + 1)
        ]);
    };

    const save = () => {
        const api = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const payload = {
            title: data[0].data.title,
            introduction: data[0].data.content,
            thumbnail: data[0].data.img_url,
            cards: data.slice(1, data.length - 1).map((d) => {
                return {
                    subTitle: d.data.title,
                    content: d.data.content,
                    imgUrl: d.data.img_url
                };
            }),
            tags: data[data.length - 1].data.tags.split(","),
            sources: data[data.length - 1].data.source.split("\n")
        };
        console.log(JSON.stringify(payload));

        // 게시물 등록
        if (id) {
            axios
                .patch(`${api}/api/v1/boards`, payload, { headers })
                .then((res) => {
                    // 게시물 등록 성공 시 my페이지로 이동
                    if (res.status === 200) {
                        alert("게시글 등록요청이 완료되었습니다.");
                        window.location.href = "/my";
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        axios
            .post(`${api}/api/v1/boards`, payload, { headers })
            .then((res) => {
                // 게시물 등록 성공 시 my페이지로 이동
                if (res.status === 200) {
                    alert("게시글 등록요청이 완료되었습니다.");
                    window.location.href = "/my";
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const loadComponent = () => {
        const props = {
            data: data[step].data,
            no: step,
            nextStep,
            prevStep,
            addStep,
            updateData: (d) => {
                updateData(step, d);
            }
        };

        switch (data[step].type) {
            case "title":
                return <Title props={props} />;
            case "content":
                return <Content props={props} />;
            case "footer":
                return <Footer props={props} save={save} />;
            default:
                return <div>error</div>;
        }
    };

    // 로그인 여부 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = "/login";
        }
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/users/info/my`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res.data.isTokenValid === false) {
                    alert("로그인이 필요합니다.");
                    window.location.href = "/login";
                }
            })
            .catch((err) => {
                alert("로그인이 필요합니다.");
                window.location.href = "/login";
            });
    }, []);

    // 게시물 수정시
    useEffect(() => {
        if (id) {
            const api = process.env.REACT_APP_API_URL;
            console.log("id", id);
            axios
                .get(`${api}/api/v1/boards/${id}`)
                .then((res) => {
                    console.log(res);
                    const data = res.data;

                    const newData = [
                        {
                            type: "title",
                            data: {
                                title: data.title,
                                img_url: data.thumbnailUrl,
                                content: data.introduction
                            }
                        },
                        ...data.cards.map((d) => {
                            return {
                                type: "content",
                                data: {
                                    title: d.subTitle,
                                    img_url: d.imgUrl,
                                    content: d.content
                                }
                            };
                        }),
                        {
                            type: "footer",
                            data: {
                                tags: data.tags.join(","),
                                source: data.sources.join("\n")
                            }
                        }
                    ];
                    setData(newData);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [id]);

    return (
        <main className="content-area__main">
            {step}
            {loadComponent()}
        </main>
    );
};
