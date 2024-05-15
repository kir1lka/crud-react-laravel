import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./views/NotFound";
import { GuestLayout } from "./layouts/GuestLayout";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { Users } from "./views/Users";
import { Dashboard } from "./views/Dashboard";
import { UserForm } from "./views/UserForm";

const RouterNav = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Navigate to="/users" /> },
            { path: "/users", element: <Users /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/users/new", element: <UserForm key="userCreate" /> },
            { path: "/users/:id", element: <UserForm key="userUpdate" /> },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },

    { path: "*", element: <NotFound /> },
]);

export default RouterNav;
