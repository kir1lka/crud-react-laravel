import { Link } from "react-router-dom";
import { TitlePage } from "../components/TitlePage";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { getUsers } from "../store/usersSlice";

export const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [...Array(users.meta.per_page - 1).keys()].slice(1);

    useEffect(() => {
        dispatch(getUsers(currentPage));
    }, [currentPage]);

    const handlePagination = (page: number = 1) => {
        setCurrentPage(page);
    };

    return (
        <div className="animated fadeInDown">
            <TitlePage
                textTitle="Пользователи"
                textButton="Добавить"
                visibleButton={true}
            />

            {/* table */}
            <div className=" rounded-lg border-2 border-gray-300  bg-white  shadow-md p-6 mb-4 ">
                <table className="w-full border-spacing-0 border-collapse ">
                    <thead className="">
                        <tr className="text-left bg-gray-300 ">
                            <th className="p-2 rounded-l-lg ">ID</th>
                            <th>Имя</th>
                            <th>Почта</th>
                            <th>Дата создания</th>
                            <th className="p-2 rounded-r-lg">Действия</th>
                        </tr>
                    </thead>

                    {users.loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            <tr className="p-2 whitespace-nowrap border-b-2">
                                <td className="p-2 whitespace-nowrap border-b-2 ">
                                    Загрузка...
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {!users.loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            {users.users.data.map((user, index) => (
                                <tr
                                    key={index}
                                    className="p-2  whitespace-nowrap border-b-2"
                                >
                                    <td className="py-2 pl-1 whitespace-nowrap border-b-2">
                                        {user.id}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2">
                                        {user.name}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2">
                                        {user.email}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2">
                                        {user.created_at}
                                    </td>
                                    <td className="py-2 whitespace-nowrap border-b-2">
                                        <Link
                                            // to={"/users/" + user.id}
                                            to={"/users"}
                                            className="py-3 px-4  rounded-md font-semibold bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white transition-all duration-200 border-2 border-yellow-600 hover:border-yellow-700"
                                        >
                                            Редактировать
                                        </Link>
                                        &nbsp;
                                        <button
                                            // onClick={() => onClickDelete(user)}
                                            className="py-3 px-4  rounded-md font-semibold bg-red-600 text-white border-2 border-red-700 hover:bg-red-700 hover:text-white transition-all duration-200 hover:border-red-800"
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {/* pagination */}
            {/* {users.loading ? (
                <></>
            ) : (
                <div className="flex justify-center mb-4">
                    <div className=" py-3 px-3 bg-white shadow-md border-2 border-gray-300 rounded-lg ">
                        <div className=" rounded-md inline-block ">
                            <button
                                onClick={() =>
                                    handlePagination(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="py-2.5 px-5 text-base bg-green-500
                            rounded-lg border-2 mr-2 border-green-600  text-white hover:bg-green-600 hover:border-green-700 hover:text-white font-semibold transition-all duration-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
                            >
                                Назад
                            </button>
                            {pageNumbers.map((page, i) => {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handlePagination(page)}
                                        className="py-2.5 px-5 text-base bg-violet-300 
                                        rounded-lg border-2 mr-2 border-violet-400 text-white hover:bg-violet-600 hover:border-violet-700 hover:text-white font-semibold transition-all duration-100 "
                                        style={{
                                            background:
                                                currentPage === page
                                                    ? "#8b5cf6"
                                                    : "",
                                            borderColor:
                                                currentPage === page
                                                    ? "#7c3aed"
                                                    : "",
                                            color:
                                                currentPage === page
                                                    ? "white"
                                                    : "",
                                        }}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() =>
                                    handlePagination(currentPage + 1)
                                }
                                disabled={
                                    currentPage === users.meta.last_page - 1
                                }
                                className="py-2.5 px-5 text-base bg-green-500
                                rounded-lg border-2 border-green-600  text-white hover:bg-green-600 hover:border-green-700 hover:text-white font-semibold transition-all duration-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500"
                            >
                                Дальше
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};
