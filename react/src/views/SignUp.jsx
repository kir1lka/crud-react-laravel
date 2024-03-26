import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "./axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function SignUp() {
    const [errors, setErrors] = useState(null);

    const [loadingResponse, setLoadingResponse] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();

    //functions
    const onSubmit = (e) => {
        e.preventDefault();
        setLoadingResponse(true);

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosManager
            .post("/signup", payload)
            .then((res) => {
                setUser(res.data.user);
                setToken(res.data.token);
                setLoadingResponse(false);
            })
            .catch((err) => {
                const res = err.response;
                if (res && res.status === 422) {
                    //err.response.data.message
                    setErrors(err.response.data.errors);
                }
                setLoadingResponse(false);
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Зарегистрируйся в системе </h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input type="name" placeholder="ФИО" ref={nameRef} />
                    <input type="email" placeholder="Почта" ref={emailRef} />
                    <input
                        type="password"
                        placeholder="Пароль"
                        ref={passwordRef}
                    />
                    <input
                        type="password"
                        placeholder="Подтверждение пароля"
                        ref={passwordConfirmationRef}
                    />
                    <button className="btn btn-block">
                        {loadingResponse ? (
                            <div className="simple-spinner">
                                <span></span>
                            </div>
                        ) : (
                            "Создать"
                        )}
                    </button>
                    <p className="message">
                        Есть аккаунт? <Link to="/login">Войти</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
