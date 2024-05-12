import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export const DefaultLayout: React.FC = () => {
    const token = useAppSelector((state) => state.auth.accessToken);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            DefaultLayout
            <Outlet />
        </div>
    );
};
