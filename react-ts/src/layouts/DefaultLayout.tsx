import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUser } from "../store/userSlice";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const DefaultLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const token = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        if (!user.user) {
            dispatch(getUser());
        }
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="max-w-screen-xl mx-auto ">
            <div className="h-screen flex flex-col">
                <Header />
                <div className="flex-grow">
                    <main>
                        <Outlet />
                    </main>
                </div>

                <div className="mt-auto">
                    <Footer />
                </div>
            </div>

            {/* notification */}
            {/* {notification && (
            <div className=" fixed right-4 bottom-4 z-10 p-4 bg-green-500 text-white rounded-lg">
                {notification}
            </div>
        )} */}
        </div>
    );
};
