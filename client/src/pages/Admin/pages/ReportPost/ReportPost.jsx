import { useState } from "react";

import { usePosts } from "../../../../hooks/usePosts";
import { PostTable } from "../../Components/PostTable";

export const ReportPost = () => {
    const [params, setParams] = useState({ viewHigh5: false, sort: "RECENT" });
    const posts = usePosts("boards/top-reported", params);

    return (
        <section className="container">
            <h1>신고된 게시물 목록</h1>
            <select
                className="select"
                onChange={(e) => setParams({ ...params, sort: e.target.value })}
            >
                <option value="RECENT">최신순</option>
                <option value="REP_HIGH">신고순</option>
            </select>
            <input
                type="checkbox"
                id="all"
                name="all"
                value="all"
                onChange={(e) =>
                    setParams({ ...params, viewHigh5: e.target.checked })
                }
            />
            <label htmlFor="all">누적 5회만 보기</label>

            <PostTable type={"report"} data={posts} />
        </section>
    );
};
