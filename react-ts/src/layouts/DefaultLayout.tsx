import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUser } from "../store/userSlice";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import { Modal } from "../components/Modal";

export const DefaultLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const token = useAppSelector((state) => state.auth.accessToken);
    const modal = useAppSelector((state) => state.modal);

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
            {modal.isOpen && <Modal />}
            <Toaster position="bottom-right" reverseOrder={false} />

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
        </div>
    );
};
