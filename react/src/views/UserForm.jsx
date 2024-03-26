import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);

            axiosManager
                .get(`/users/${id}`)
                .then((res) => {
                    setUser(res.data);
                    // console.log(res.data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    //function
    const onSubmit = (e) => {
        e.preventDefault();

        if (user.id) {
            axiosManager
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("Пользователь был обновлен!");
                    navigate("/users");
                })
                .catch((err) => {
                    const res = err.response;
                    if (res && res.status === 422) {
                        setErrors(err.response.data.errors);
                    }
                });
        } else {
            axiosManager
                .post(`/users`, user)
                .then(() => {
                    setNotification("Пользователь был создан!");
                    navigate("/users");
                })
                .catch((err) => {
                    const res = err.response;
                    if (res && res.status === 422) {
                        setErrors(err.response.data.errors);
                    }
                });
        }
    };

    return (
        <div>
            {user.id && <h1>Редактирование пользователя: {user.name} </h1>}
            {!user.id && <h1>Добавление пользователя </h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Загрузка...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="name"
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            placeholder="ФИО"
                        ></input>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            placeholder="Почта"
                        ></input>
                        <input
                            type="password"
                            value={user.password}
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Пароль"
                        ></input>
                        <input
                            type="password_confirmation"
                            // value={user.password_confirmation}
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            placeholder="Пароль подтверждение"
                        ></input>
                        <button className="btn">Сохранить</button>
                    </form>
                )}
            </div>
        </div>
    );
}
