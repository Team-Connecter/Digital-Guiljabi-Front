//import { useState } from "react";

import { PostTable } from "../../Components/PostTable"
import { usePosts } from "../../../../hooks/usePosts";
import "../../../../styles/admin.css"

export const WaitingPost = () => {

    //const [params, setParams] = useState({});
    const posts = usePosts("boards/waiting", {});

    return (
        <section className="container">
            <h1>승인대기 게시물 목록</h1>

            <PostTable type={"wait"} data={posts} />
        </section>
    )
}
