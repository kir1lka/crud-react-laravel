import { useNavigate, useParams } from "react-router-dom";
import { TitlePage } from "../components/TitlePage";
import { Input } from "../components/Input";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    createUser,
    getUsers,
    getUsersShow,
    updateUser,
} from "../store/usersSlice";
import { ErrorList } from "../components/ErrorList";

type ErrorState = {
    [key: string]: string[];
};

export const UserForm: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    let currentUser = useAppSelector((state) => state.users);

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
    const [errors, setErrors] = useState<ErrorState>({});

    const { id } = useParams();

    //ref
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
    }, [id, dispatch]);

    useEffect(() => {
        if (currentUser.error && typeof currentUser.error === "object") {
            setErrors(currentUser.error);
        } else {
            setErrors({});
        }
    }, [currentUser.error]);

    //functions
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.id) {
            await dispatch(updateUser(user)).unwrap();
            navigate("/users");
        } else {
            await dispatch(createUser(user)).unwrap();
            dispatch(getUsers(1));
            navigate("/users");
        }
    };

    return (
        <div className="animated fadeInDown">
            {user.id !== 0 && (
                <TitlePage
                    textTitle={`Редактирование пользователя: ${user.name}`}
                />
            )}
            {!user.id && <TitlePage textTitle="Добавление пользователя" />}
            <div className="bg-white rounded-lg py-6 px-6 border-2 border-gray-300 shadow-sm mb-4  flex flex-col">
                <div className="w-3/5">
                    {currentUser.error && <ErrorList errors={errors} />}
                </div>
                <div className="flex ">
                    <div className="w-3/5">
                        <form onSubmit={onSubmit} className="">
                            <Input
                                inputRef={nameRef}
                                valueText={user.name}
                                onChange={(ev) =>
                                    setUser({ ...user, name: ev.target.value })
                                }
                                type="name"
                                placeholder="ФИО"
                                autocomplete="off"
                            />
                            <Input
                                inputRef={emailRef}
                                valueText={user.email}
                                onChange={(ev) =>
                                    setUser({ ...user, email: ev.target.value })
                                }
                                type="email"
                                placeholder="Почта"
                                autocomplete="off"
                            />
                            <Input
                                inputRef={passwordRef}
                                type="password"
                                placeholder="Пароль"
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                passwordShow={true}
                                autocomplete="off"
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
                                autocomplete="off"
                            />
                            <div className="w-1/3">
                                <ButtonSubmit
                                    loading={currentUser.loading}
                                    text="Сохранить"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col    items-center w-2/5 h-full">
                        <div className="ml-4 text-base font-semibold">
                            <p className="mb-4">
                                Поле «ФИО» содержит полное имя пользователя.
                            </p>
                            <p className="mb-4">
                                Поле «Почта» содержит электронный адрес
                                пользователя.
                            </p>
                            <p className="mb-4">
                                Поле «Пароль» используется для входа в систему.
                                Пожалуйста, выберите надежный пароль, содержащий
                                буквы, цифры и символы.
                            </p>
                            <p className="mb-4">
                                Поле «Подтверждение пароля» используется для
                                проверки правильности ввода пароля. Пожалуйста,
                                введите пароль еще раз в этом поле.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
