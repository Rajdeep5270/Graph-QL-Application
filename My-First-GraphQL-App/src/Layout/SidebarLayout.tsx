import { Link, Outlet } from "react-router";

export default function SidebarLayout() {
    return <>
        <div className="grid">
            <div className="col-2">
                <div className="h-screen border-right-1">
                    <h2 className="my-0">Sidebar</h2>
                    <nav>
                        <ul>
                            <li><Link to="/" className="text-1xl text-500 border-2 px-4 py-1 my-2">All Author</Link></li>
                            <li><Link to="/" className="text-1xl text-500 border-2 px-4 py-1 my-2">Add Author</Link></li>
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
