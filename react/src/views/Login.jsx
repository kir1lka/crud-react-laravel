import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const [errors, setErrors] = useState(null);

    const [loadingResponse, setLoadingResponse] = useState(false);

    const { setUser, setToken } = useStateContext();

    const emailRef = useRef < HTMLInputElement > null;
    const passwordRef = useRef < HTMLInputElement > null;

    //function
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingResponse(true);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosManager
            .post("/login", payload)
            .then((res) => {
                setUser(res.data.user);
                setToken(res.data.token);
                setLoadingResponse(false);
            })
            .catch((err) => {
                const res = err.response;
                if (res && res.status === 422) {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setErrors({
                            email: [res.data.message],
                        });
                    }
                }
                setLoadingResponse(false);
                // debugger;
            });
    };
    return (
        <div className="flex h-screen justify-center items-center animated fadeInDown">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 mt-2 w-96">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="font-semibold text-2xl text-black text-center mb-4">
                        Вход в систему
                    </h1>
                    {errors && (
                        <div className="p-4 bg-red-500 text-white rounded-lg mb-4">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Почта"
                        className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Пароль"
                        className="bg-white w-full border-2 border-gray-300 p-4 mb-4 box-border text-sm transition-all duration-300 rounded-lg focus:outline-2 focus:outline-violet-500 "
                    />
                    <button className="py-3 px-4 w-full rounded-md font-semibold bg-violet-500 text-white hover:bg-violet-600 hover:text-white transition-all duration-200 mb-4">
                        {loadingResponse ? <div>Загрузка...</div> : "Войти"}
                    </button>
                    <p className="text-black text-base">
                        Нет аккаунта?{" "}
                        <Link
                            to="/signup"
                            className="text-violet-500 font-bold hover:text-violet-600"
                        >
                            Создать
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
