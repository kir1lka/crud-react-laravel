import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export const GuestLayout: React.FC = () => {
    const token = useAppSelector((state) => state.auth.accessToken);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
