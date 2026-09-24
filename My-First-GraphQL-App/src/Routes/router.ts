import { createBrowserRouter } from "react-router";
import App from "../App";
import FetchAllAuthorPage from "../Pages/FetchAllAuthorPage";
import SidebarLayout from "../Layout/SidebarLayout";

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
                    }
                ]
            }
        ]
    },
]);

export default router;