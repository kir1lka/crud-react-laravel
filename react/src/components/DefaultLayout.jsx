import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosManager from "../views/axios-client";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        axiosManager.get("/user").then((res) => {
            setUser(res.data);
        });
    }, []);

    //functions
    const onLogout = (e) => {
        e.preventDefault();

        axiosManager.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div id="defaultLayout">
            {/* left bar */}
            <aside>
                <Link to="/users">Пользователи</Link>
                <Link to="/dashboard">Dashboard</Link>
            </aside>

            {/* content */}
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a
                            href="#"
                            onClick={onLogout}
                            className="btn-logout"
                            style={{ marginLeft: 10 }}
                        >
                            Выйти
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
