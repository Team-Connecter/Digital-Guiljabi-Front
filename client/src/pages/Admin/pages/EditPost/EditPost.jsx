// import { useState } from "react";
import { usePosts } from "../../../../hooks/usePosts"
import { PostTable } from "../../Components/PostTable"

export const EditPost = () => {

    // const [params, setParams] = useState({});
    const posts = usePosts("edit-requests", {});

    return (
        <section className="container">
            <h1>수정요청을 받은 글</h1>

            <PostTable type={"edit"} data={posts} />
        </section>
    )
}