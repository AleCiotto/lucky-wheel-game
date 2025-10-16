/// <reference types="vite/client" />

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import PageLayout from "./PageLayout";

export default function AppRouter() {
    // usa BASE_URL fornito da Vite e rimuovi lo slash finale se presente (salva "/" com'è)
    const rawBase = import.meta.env.BASE_URL ?? '/';
    const basename = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '');

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageLayout><HomePage /></PageLayout>,
        },
        {
            path: "/error",
            element: <ErrorPage />
        },
        {
            path: "*",
            element: <NotFoundPage />
        },
    ], { basename: basename });

    return <RouterProvider router={router} />
}

