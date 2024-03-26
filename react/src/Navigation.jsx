import Login from "./views/Login.jsx";
import Users from "./views/Users.jsx";
import SignUp from "./views/SignUp.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";

import { Navigate, createBrowserRouter } from "react-router-dom";
import UserForm from "./views/UserForm.jsx";

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
            { path: "/signup", element: <SignUp /> },
        ],
    },

    { path: "*", element: <NotFound /> },
]);

export default RouterNav;
