import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    //function
    const getUsers = () => {
        setLoading(true);
        axiosManager
            .get("/users")
            .then((res) => {
                setLoading(false);
                setUsers(res.data.data);
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
                <h1>Пользователи</h1>
                <Link
                    to="/users/new"
                    className="btn btn-add"
                    style={{ padding: 15, fontSize: 16 }}
                >
                    Добавить
                </Link>
            </div>

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
        </div>
    );
}
