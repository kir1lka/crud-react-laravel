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
            {user.id && (
                <h1 className="font-bold text-2xl text-black">
                    Редактирование пользователя: {user.name}{" "}
                </h1>
            )}
            {!user.id && (
                <h1 className="font-bold text-2xl text-black">
                    Добавление пользователя{" "}
                </h1>
            )}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 mt-2 animated fadeInDown">
                {loading && <div className="text-center">Загрузка...</div>}
                {errors && (
                    <div className=" p-4 bg-red-500 text-white rounded-lg mb-4">
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
                            className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                        ></input>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            placeholder="Почта"
                            className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                        ></input>
                        <input
                            type="password"
                            value={user.password}
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Пароль"
                            className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                        ></input>
                        <input
                            type="password"
                            // value={user.password_confirmation}
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            placeholder="Пароль подтверждение"
                            className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                        ></input>
                        <button className="py-3 px-4 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600 hover:text-white transition-all duration-200">
                            Сохранить
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
