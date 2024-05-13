import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosManager from "../axios-client";
import { useAppDispatch } from "../hooks";
import { addAccessToken } from "../store/authSlice";
import { setUser } from "../store/userSlice";
import { Form } from "../components/Form";
import { ErrorList } from "../components/ErrorList";
import { Input } from "../components/Input";
import { ButtonSubmit } from "../components/ButtonSubmit";

type Payload = {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    password_confirmation?: string | undefined;
};

type ErrorState = {
    [key: string]: string[];
};

export const Signup: React.FC = () => {
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<ErrorState>({});

    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    //functions
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const payload: Payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        };

        axiosManager
            .post("/signup", payload)
            .then((res) => {
                dispatch(setUser(res.data.user));
                dispatch(addAccessToken(res.data.token));
                setLoading(false);
            })
            .catch((err) => {
                const res = err.response;
                if (res && res.status === 422) {
                    setErrors(err.response.data.errors);
                }
                setLoading(false);
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <h1 className="text-3xl font-black text-center mb-4">
                Регистрация{" "}
            </h1>
            <ErrorList errors={errors} />
            <Input inputRef={nameRef} type="name" placeholder="ФИО" />
            <Input inputRef={emailRef} type="email" placeholder="Почта" />
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
            <ButtonSubmit loading={loading} text="Создать" />
            <p className="text-black text-base">
                Есть аккаунт?{" "}
                <Link
                    to="/login"
                    className="text-violet-500 font-bold hover:text-violet-600 underline"
                >
                    Войти
                </Link>
            </p>
        </Form>
    );
};
