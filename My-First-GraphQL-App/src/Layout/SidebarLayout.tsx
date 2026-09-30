import { NavLink, Outlet } from "react-router";

export default function SidebarLayout() {
    return <>
        <div className="grid">
            <div className="col-2">
                <div className="h-screen border-right-1">
                    <h2 className="my-0">Sidebar</h2>
                    <nav>
                        <ul>
                            <li><NavLink to="/" className={({ isActive }) => `text-1xl text-500 border-2 px-4 py-1 my-2 ${(isActive) ? "bg-black-alpha-90 text-white-alpha-90" : ""}`}>All Author & Books</NavLink></li>
                            <li><NavLink to="/view-all-author" className={({ isActive }) => `text-1xl text-500 border-2 px-4 py-1 my-2 ${(isActive) ? "bg-black-alpha-90 text-white-alpha-90" : ""}`}>All Author</NavLink></li>
                            <li><NavLink to="/add-author" className={({ isActive }) => `text-1xl text-500 border-2 px-4 py-1 my-2 ${(isActive) ? "bg-black-alpha-90 text-white-alpha-90" : ""}`}>Add Author</NavLink></li>
                            <li><NavLink to="/view-all-book" className={({ isActive }) => `text-1xl text-500 border-2 px-4 py-1 my-2 ${(isActive) ? "bg-black-alpha-90 text-white-alpha-90" : ""}`}>All Book</NavLink></li>
                            <li><NavLink to="/add-book" className={({ isActive }) => `text-1xl text-500 border-2 px-4 py-1 my-2 ${(isActive) ? "bg-black-alpha-90 text-white-alpha-90" : ""}`}>Add Book</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="col-10">
                <Outlet />
            </div>
        </div>
    </>
}
