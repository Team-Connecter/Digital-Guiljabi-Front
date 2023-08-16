import { useNavigate } from "react-router-dom"

export const PostTable = ({ type, data }) => {
    const navigate = useNavigate()
    const onClick = (pk) => {
        navigate(`/admin/service/${type}/${pk}`)
    }
    const typeToWord = {
        wait: "요청",
        report: "신고",
        edit: "요청"
    }
    return (
        <table className="post-table">
            <thead>
                <tr>
                    <th>{typeToWord[type]} 일시</th>
                    <th>글쓴이</th>
                    <th>제목</th>
                    <th>비고</th>
                </tr>
            </thead>

            <tbody>
                {data.map((post, index) => {
                    return (
                        <tr key={index} onClick={()=>onClick(post.pk)}>
                            <td>{post.date}</td>
                            <td>{post.author}</td>
                            <td>{post.title}</td>
                            <td>{post.remark}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}