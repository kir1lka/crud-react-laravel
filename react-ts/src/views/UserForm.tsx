import { useParams } from "react-router-dom";
import { TitlePage } from "../components/TitlePage";
import { Input } from "../components/Input";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUsersShow } from "../store/usersSlice";

interface UsersState {
    users: {
        data: User[];
    };
    meta: {
        current_page: number;
        per_page: number;
        last_page: number;
    };
    loading: boolean;
    error: string | null | undefined;
}

export const UserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    let user = useAppSelector((state) => state.users);

    // const [user, setUser] = useState<UsersState>();

    const { id } = useParams();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(getUsersShow(id));
        // setUser(currentUser);
    }, [id, dispatch]);

    return (
        <div className="animated fadeInDown">
            {user?.users.data[0]?.id && (
                <TitlePage
                    textTitle={`Редактирование пользователя: ${
                        user.loading === true
                            ? " Загрузка..."
                            : user.users.data[0]?.name
                    }`}
                />
            )}
            {!user?.users.data[0]?.id && (
                <TitlePage textTitle="Добавление пользователя" />
            )}
            <div className="bg-white rounded-lg py-6 px-6 border-2 border-gray-300 shadow-sm mb-4  flex ">
                <div className="w-3/5">
                    {/* {!loading && ( */}
                    <form
                        // onSubmit={onSubmit}
                        className=""
                    >
                        <Input
                            inputRef={nameRef}
                            valueText={user?.users.data[0]?.name}
                            // onChange={(ev) =>
                            //     setUser({ ...user?.users., name: ev.target.value })
                            // }
                            type="name"
                            placeholder="ФИО"
                        />
                        <Input
                            inputRef={emailRef}
                            valueText={user?.users.data[0]?.email}
                            type="email"
                            placeholder="Почта"
                        />
                        <Input
                            inputRef={passwordRef}
                            type="password"
                            placeholder="Пароль"
                            passwordShow={true}
                        />
                        <Input
                            inputRef={passwordConfirmationRef}
                            type="password"
                            placeholder="Подтверждение пароля"
                            passwordShow={true}
                        />
                        <div className="w-1/3">
                            <ButtonSubmit loading={false} text="Создать" />
                        </div>
                    </form>
                    {/* )} */}
                </div>
                <div className="flex flex-col  justify-center  items-center w-2/5 h-full">
                    <div className="flex h-72 w-72 bg-violet-500 rounded-full  justify-center items-center border-4 border-violet-600 mb-4 hover:bg-violet-600 hover:border-violet-700 transition-all duration-200">
                        <h2 className="text-6xl font-black text-white ">
                            {user?.loading === true
                                ? " ..."
                                : user?.users.data[0]?.name
                                ? user?.users.data[0]?.name
                                      .toUpperCase()
                                      .charAt(0)
                                : "?"}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
