import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const [errors, setErrors] = useState(null);

    const [loadingResponse, setLoadingResponse] = useState(false);

    const { setUser, setToken } = useStateContext();

    const emailRef = useRef();
    const passwordRef = useRef();

    //function
    const onSubmit = (e) => {
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
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Вход в систему</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Почта" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Пароль"
                    />
                    <button className="btn btn-block">
                        {loadingResponse ? (
                            <div className="simple-spinner">
                                <span></span>
                            </div>
                        ) : (
                            "Войти"
                        )}
                    </button>
                    <p className="message">
                        Нет аккаунта? <Link to="/signup">Создать</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
