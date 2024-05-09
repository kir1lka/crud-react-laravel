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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 className="text-3xl">Пользователи</h1>
                <Link
                    to="/users/new"
                    className=" btn btn-add  "
                    style={{ padding: 10, fontSize: 16 }}
                >
                    Добавить
                </Link>
            </div>

            {/* table */}
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Почта</th>
                            <th>Дата создания</th>
                            <th>Действия</th>
                        </tr>
                    </thead>

                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <div className="simple-spinnerr">
                                        <p></p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {!loading && (
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            to={"/users/" + user.id}
                                            className="btn-edit"
                                            style={{ padding: 15, height: 50 }}
                                        >
                                            Редактировать
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={() => onClickDelete(user)}
                                            className="btn-delete"
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
                <>{/* <p>Загрузка...</p> */}</>
            ) : (
                <div>
                    <button
                        onClick={() => getUsers(currentPage - 1)}
                        disabled={currentPage === 1}
                        className=""
                    >
                        Назад
                    </button>
                    {pageNumbers.map((page, i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => getUsers(page)}
                                style={{
                                    background:
                                        currentPage === page ? "pink" : "white",
                                }}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => getUsers(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Дальше
                    </button>
                </div>
            )}
        </div>
    );
}
