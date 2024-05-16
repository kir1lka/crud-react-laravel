import React, { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
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
        <div className="max-w-screen-xl mx-auto">
            {/* header */}
            <header className="  top-0 py-3 px-2 mb-4 border-b flex items-center justify-between ">
                <div className="flex items-center ">
                    <NavLink
                        to="/"
                        className="uppercase font-extrabold text-5xl text-violet-500 hover:text-violet-600 "
                    >
                        swydd
                    </NavLink>
                    <nav className="ml-10">
                        <ul className="font-semibold flex">
                            <li className="mr-4">
                                <NavLink
                                    to="/users"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "text-purple-500 inline-block py-1 px-2 border-b-2 border-violet-500 transition-all duration-200"
                                            : "text-gray-400 inline-block py-1 px-2 border-b-2 border-transparent transition-all duration-200";
                                    }}
                                >
                                    Пользователи
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => {
                                        return isActive
                                            ? "text-purple-500 inline-block py-1 px-2 border-b-2 border-violet-500 transition-all duration-200"
                                            : "text-gray-400 inline-block py-1 px-2 border-b-2 border-transparent transition-all duration-200";
                                    }}
                                >
                                    Панель
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className=" items-center">
                    <p className="inline-block py-3 px-2 font-semibold text-purple-500">
                        {user.name}
                    </p>
                    <button
                        onClick={onLogout}
                        className="py-2 px-4   rounded-md font-semibold bg-gray-300 text-gray-500 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                        Выйти
                    </button>
                </div>
            </header>

            <div className="">
                <main>
                    <Outlet />
                </main>
            </div>

            {/* notification */}
            {notification && (
                <div className=" fixed right-4 bottom-4 z-10 p-4 bg-green-500 text-white rounded-lg">
                    {notification}
                </div>
            )}
        </div>
    );
}
