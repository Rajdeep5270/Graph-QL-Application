import { createBrowserRouter } from "react-router";
import App from "../App";
import FetchAllAuthorPage from "../Pages/FetchAllAuthorPage";
import SidebarLayout from "../Layout/SidebarLayout";
import AddAuthorPage from "../Pages/AddAuthorPage";
import AddBookPage from "../Pages/AddBookPage";
import EditBookPage from "../Pages/EditBookPage";
import ViewAllBookPage from "../Pages/ViewAllBookPage";
import ViewAllAuthorPage from "../Pages/ViewAllAuthorPage";
import EditAuthorPage from "../Pages/EditAuthorPage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                Component: SidebarLayout,
                children: [
                    {
                        index: true,
                        Component: FetchAllAuthorPage
                    },
                    {
                        path: '/add-author',
                        Component: AddAuthorPage
                    },
                    {
                        path: '/edit-author-page',
                        Component: EditAuthorPage
                    },
                    {
                        path: '/view-all-author',
                        Component: ViewAllAuthorPage
                    },
                    {
                        path: '/add-book',
                        Component: AddBookPage
                    },
                    {
                        path: '/edit-book/:editId',
                        Component: EditBookPage
                    },
                    {
                        path: '/view-all-book',
                        Component: ViewAllBookPage
                    }
                ]
            }
        ]
    },
]);

export default router;