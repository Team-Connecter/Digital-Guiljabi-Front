import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar"
import "../../styles/admin.css"

export const AdminLayout = () => {
    return (
        <>
            <div className="Admin-Title">
                <h1>관리자 페이지</h1>
            </div>
            <Sidebar />
            <Outlet />
        </>
    )
}