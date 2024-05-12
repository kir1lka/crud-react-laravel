import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(10);
    const pageNumbers = [...Array(lastPage + 1).keys()].slice(1);

    useEffect(() => {
        getUsers(currentPage, true);
    }, []);

    //function
    const getUsers = (page = 1, loadingTable = false) => {
        setLoading(loadingTable);
        axiosManager
            .get(`/users?page=${page}`)
            .then((res) => {
                setLoading(false);
                setUsers(res.data.data);

                setCurrentPage(res.data.meta.current_page);
                // console.log(res.data.meta.last_page);
                setLastPage(res.data.meta.last_page);
                // console.log(res.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onClickDelete = (e) => {
        if (
            !window.confirm(
                "Вы уверены, что хотите удалить этого пользователя?"
            )
        ) {
            return;
        }

        axiosManager.delete(`/users/${e.id}`).then(() => {
            setNotification("Пользователь был обновлен!");
            getUsers();
        });
    };

    return (
        <div>
            {/* header */}
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl text-black">Пользователи</h1>
                <Link
                    to="/users/new"
                    className="py-3 px-4 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600 hover:text-white transition-all duration-200"
                >
                    Добавить
                </Link>
            </div>

            {/* table */}
            {/* className="card animated fadeInDown" */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 mt-2 animated fadeInDown">
                <table className="w-full border-spacing-0 border-collapse ">
                    <thead className="text-left  bg-gray-300 rounded-lg">
                        <tr className="text-left  bg-gray-300 rounded-lg">
                            <th className="p-2 rounded-l-lg">ID</th>
                            <th>Имя</th>
                            <th>Почта</th>
                            <th>Дата создания</th>
                            <th className="p-2 rounded-r-lg">Действия</th>
                        </tr>
                    </thead>

                    {loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            <tr className="p-2 whitespace-nowrap border-b-2">
                                <td className="p-2 whitespace-nowrap border-b-2 ">
                                    {/* <div className="simple-spinnerr">
                                        <p></p>
                                    </div> */}
                                    Загрузка...
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {!loading && (
                        <tbody className="p-2 whitespace-nowrap border-b-2">
                            {users.map((user, index) => (
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
                                            to={"/users/" + user.id}
                                            className="py-3 px-4  rounded-md font-semibold bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white transition-all duration-200"
                                            style={{ padding: 15, height: 50 }}
                                        >
                                            Редактировать
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={() => onClickDelete(user)}
                                            className="py-3 px-4  rounded-md font-semibold bg-red-600 text-white hover:bg-red-700 hover:text-white transition-all duration-200"
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
            {loading ? (
                <></>
            ) : (
                <div className="mt-10 mb-10 flex justify-center">
                    <button
                        onClick={() => getUsers(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="py-1 px-3 text-base border bg-white border-gray-300 text-gray-500 hover:bg-violet-300 hover:text-gray-900 font-semibold rounded-l-lg"
                    >
                        Назад
                    </button>
                    {pageNumbers.map((page, i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => getUsers(page)}
                                className="py-1 px-3  text-base border bg-white border-gray-300 text-gray-500 hover:bg-violet-300 hover:text-gray-900 font-semibold "
                                style={{
                                    background:
                                        currentPage === page ? "#7c3aed" : "",
                                    color: currentPage === page ? "white" : "",
                                }}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => getUsers(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="py-1 px-3  text-base bg-white border border-gray-300 text-gray-500 hover:bg-violet-300 hover:text-gray-900 font-semibold rounded-r-lg"
                    >
                        Дальше
                    </button>
                </div>
            )}
        </div>
    );
}
