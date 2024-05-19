import React, { Ref, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

type autocompleteType = "off" | "on";

type InputProps = {
    inputRef: Ref<HTMLInputElement>;
    type: string;
    placeholder: string;
    passwordShow?: boolean;
    valueText?: string;
    autocomplete?: autocompleteType;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
    inputRef,
    type,
    placeholder,
    passwordShow = false,
    valueText = undefined,
    autocomplete = "on",
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <div className="relative flex justify-end items-center">
                {passwordShow && (
                    <>
                        <input
                            ref={inputRef}
                            type={showPassword ? "text" : "password"}
                            onChange={onChange}
                            placeholder={placeholder}
                            autoComplete={autocomplete}
                            className="bg-white w-full border-2 border-gray-300 p-4  box-border rounded-lg focus:outline-2 focus:outline-violet-600 pr-12 text-base"
                        />
                        {type === "password" && (
                            <button
                                type="button"
                                className="absolute pr-5"
                                onClick={handleTogglePassword}
                            >
                                {!showPassword ? (
                                    <HiEyeOff className="text-2xl" />
                                ) : (
                                    <HiEye className="text-2xl" />
                                )}
                            </button>
                        )}
                    </>
                )}

                {!passwordShow && (
                    <input
                        ref={inputRef}
                        value={valueText}
                        onChange={onChange}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
                        className="bg-white w-full border-2 border-gray-300 p-4  box-border  rounded-lg focus:outline-2 focus:outline-violet-600 pr-12 text-base"
                    />
                )}
            </div>
        </div>
    );
};
