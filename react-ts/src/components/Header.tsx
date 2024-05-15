import { NavLink } from "react-router-dom";
import { NavLinkHeader } from "./NavLinkHeader";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeAccessToken } from "../store/authSlice";
import { removeUser } from "../store/userSlice";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    //functions
    const onLogout = () => {
        dispatch(removeAccessToken());
        dispatch(removeUser());
    };

    return (
        <header className="  bg-white rounded-b-lg py-5 px-6  border-b-2 border-r-2 border-l-2 border-gray-300 shadow-sm border-b flex items-center justify-between mb-2">
            <div className="flex items-center ">
                <NavLink
                    to="/"
                    className="uppercase font-extrabold text-5xl text-violet-500"
                >
                    swydd
                </NavLink>
                <nav className="ml-10">
                    <ul className="font-semibold flex">
                        <li className="mr-4">
                            <NavLinkHeader
                                text="Пользователи"
                                toLink="/users"
                            />
                        </li>
                        <li>
                            <NavLinkHeader text="Панель" toLink="/dashboard" />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className=" items-center">
                <p className="inline-block py-3 px-2 font-semibold text-base">
                    {user.loading && <p>загрузка...</p>}
                    {!user.loading && <p>{user.user?.name} </p>}
                </p>
                <button
                    onClick={onLogout}
                    className="py-2 px-4 text-base border-2 border-gray-400 rounded-md font-semibold bg-gray-300 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-700 active:bg-red-700 transition-all duration-200"
                >
                    Выйти
                </button>
            </div>
        </header>
    );
};
