import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

export default function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/error",
            element: <ErrorPage />
        },
        {
            path: "*",
            element: <NotFoundPage />
        },
    ])

    return <RouterProvider router={router} />
}

