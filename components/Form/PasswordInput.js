import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import FormErrorMessage from "./FormErrorMessage";

const PasswordInput = ({ placeholder, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="relative w-full">
                <input
                    autoComplete="off"
                    type={!showPassword ? "password" : "text"}
                    className={`w-full px-3 py-2 border-b focus:border-purple-500 outline-none placeholder-gray-500 bg-transparent transition
                        ${error ? "border-red-600" : "border-gray-600"}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {showPassword ? (
                    <EyeIcon
                        className="absolute top-3 right-0 h-5 mr-2 cursor-pointer"
                        onClick={() => {
                            setShowPassword((prev) => !prev);
                        }}
                    />
                ) : (
                    <EyeOffIcon
                        className="absolute top-3 right-0 h-5 mr-2 text-gray-600 cursor-pointer"
                        onClick={() => {
                            setShowPassword((prev) => !prev);
                        }}
                    />
                )}
            </div>
            {error && <FormErrorMessage error={error} />}
        </div>
    );
};

export default PasswordInput;
