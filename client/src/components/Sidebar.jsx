import { useNavigate } from "react-router-dom";
import "../styles/admin.css"

export const Sidebar = () => {
    const navigate = useNavigate();
    const pageInfo = [
        {
            name: "메인",
            pages: [
                { name: "메인페이지", path: "/" },
            ]
        },
        {
            name: "회원",
            pages: [
                // { name: "회원관리", path: "/admin/user/users" },
                // { name: "관리자관리", path: "/admin/user/admin" },
                // { name: "정지된 회원 관리", path: "/admin/user/ban" },
            ]
        },
        {
            name: "서비스",
            pages: [
                // { name: "게시글/댓글 관리", path: "/admin/service/post" },
                { name: "승인대기 게시물 목록", path: "/admin/service/wait" },
                { name: "수정요청 목록", path: "/admin/service/edit" },
                { name: "신고 목록", path: "/admin/service/report" },
                // { name: "문의 목록", path: "/admin/service/question" },
            ]
        }
    ]

    return (
        <section className="admin-sidebar">
            {/* <div className="admin-sidebar__logo" onClick={()=>navigate("/admin")}>
                <img src="/images/logo.png" alt="logo" />
            </div> */}
            <div className="admin-sidebar__menu">
                {pageInfo.map((page, index) => (page.name !== "메인") && (
                    <div key={index} className="admin-sidebar__menu__item">
                        <div className="admin-sidebar__menu__item__title">{page.name}</div>
                        <ul className="admin-sidebar__menu__item__list">
                            {page.pages.map((item, index) => (
                                <li key={index} className="admin-sidebar__menu__item__list__item" onClick={() => navigate(item.path)}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}