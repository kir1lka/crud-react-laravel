import { useNavigate, useParams } from "react-router-dom";
import { TitlePage } from "../components/TitlePage";
import { Input } from "../components/Input";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUsersShow } from "../store/usersSlice";

export const UserForm: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    // let user = useAppSelector((state) => state.users);
    let currentUser = useAppSelector((state) => state.users);
    let loading = useAppSelector((state) => state.users.loading);

    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
    });

    const { id } = useParams();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(getUsersShow(id));
        if (id) {
            setUser({
                id: currentUser.users.data[0]?.id,
                name: currentUser.users.data[0]?.name,
                email: currentUser.users.data[0]?.email,
                password: "",
                password_confirmation: "",
                email_verified_at: "",
                created_at: "",
                updated_at: "",
            });
        }

        // setUser(currentUser);
    }, [id, dispatch]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.id) {
            // axiosManager
            //     .put(`/users/${user.id}`, user)
            //     .then(() => {
            //         setNotification("Пользователь был обновлен!");
            //         navigate("/users");
            //     })
            //     .catch((err) => {
            //         const res = err.response;
            //         if (res && res.status === 422) {
            //             setErrors(err.response.data.errors);
            //         }
            //     });
            navigate("/users");
        } else {
            // axiosManager
            //     .post(`/users`, user)
            //     .then(() => {
            //         setNotification("Пользователь был создан!");
            //         navigate("/users");
            //     })
            //     .catch((err) => {
            //         const res = err.response;
            //         if (res && res.status === 422) {
            //             setErrors(err.response.data.errors);
            //         }
            //     });
            navigate("/users");
        }
    };

    return (
        <div className="animated fadeInDown">
            {user?.id && (
                <TitlePage
                    textTitle={`Редактирование пользователя: ${
                        loading === true ? " Загрузка..." : user.name
                    }`}
                />
            )}
            {!user?.id && <TitlePage textTitle="Добавление пользователя" />}
            <div className="bg-white rounded-lg py-6 px-6 border-2 border-gray-300 shadow-sm mb-4  flex ">
                <div className="w-3/5">
                    {/* {!loading && ( */}
                    <form onSubmit={onSubmit} className="">
                        <Input
                            inputRef={nameRef}
                            valueText={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            type="name"
                            placeholder="ФИО"
                        />
                        <Input
                            inputRef={emailRef}
                            valueText={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            type="email"
                            placeholder="Почта"
                        />
                        <Input
                            inputRef={passwordRef}
                            type="password"
                            placeholder="Пароль"
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            passwordShow={true}
                        />
                        <Input
                            inputRef={passwordConfirmationRef}
                            type="password"
                            placeholder="Подтверждение пароля"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            passwordShow={true}
                        />
                        <div className="w-1/3">
                            <ButtonSubmit loading={false} text="Сохранить" />
                        </div>
                    </form>
                    {/* )} */}
                </div>
                <div className="flex flex-col  justify-center  items-center w-2/5 h-full">
                    {/* <div className="flex h-72 w-72 bg-violet-500 rounded-full  justify-center items-center border-4 border-violet-600 mb-4 hover:bg-violet-600 hover:border-violet-700 transition-all duration-200">
                        <h2 className="text-6xl font-black text-white ">
                            {user.id ? user?.name.charAt(0).toUpperCase() : "?"}
                        </h2>
                    </div> */}
                    <div className="ml-4 text-base font-semibold">
                        <p className="mb-4">
                            Поле 'ФИО' содержит полное имя пользователя.
                        </p>
                        <p className="mb-4">
                            Поле 'Почта' содержит электронный адрес
                            пользователя.
                        </p>
                        <p className="mb-4">
                            Поле 'Пароль' используется для входа в систему.
                            Пожалуйста, выберите надежный пароль, содержащий
                            буквы, цифры и символы. Поле 'Подтверждение пароля'
                            используется для проверки правильности ввода пароля.
                            Пожалуйста, введите пароль еще раз в этом поле."
                        </p>
                        <p className="mb-4">
                            Поле 'Подтверждение пароля' используется для
                            проверки правильности ввода пароля. Пожалуйста,
                            введите пароль еще раз в этом поле."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
