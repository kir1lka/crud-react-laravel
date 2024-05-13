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
    email: string | undefined;
    password: string | undefined;
};

export const Login: React.FC = () => {
    const [errors, setErrors] = useState<ErrorState>({});
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    //function
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const payload: Payload = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        };

        axiosManager
            .post("/login", payload)
            .then((res) => {
                dispatch(setUser(res.data.user));
                dispatch(addAccessToken(res.data.token));
                setLoading(false);
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
                setLoading(false);
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <h1 className="text-3xl font-black text-center mb-4">
                Авторизация
            </h1>
            <ErrorList errors={errors} />
            <Input inputRef={emailRef} type="email" placeholder="Почта" />
            <Input
                inputRef={passwordRef}
                type="password"
                placeholder="Пароль"
                passwordShow={true}
            />
            <ButtonSubmit loading={loading} text="Войти" />
            <p className="text-black text-base">
                Нет аккаунта?{" "}
                <Link
                    to="/signup"
                    className="text-violet-500 font-bold hover:text-violet-600 underline"
                >
                    Создать
                </Link>
            </p>
        </Form>
    );
};
