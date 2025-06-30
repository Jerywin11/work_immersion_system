// hooks/useRouteProgress.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export const useRouteProgress = () => {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();

        const timeout = setTimeout(() => {
            NProgress.done();
        }, 500); // simulate a delay

        return () => clearTimeout(timeout);
    }, [location.pathname]);
};
