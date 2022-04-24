import React from "react";
import FormErrorMessage from "./FormErrorMessage";

const Input = ({ type, placeholder, value, onChange, error }) => {
    return (
        <div className="w-full">
            <input
                autoComplete="off"
                type={type}
                className={`w-full px-3 py-2 border-b focus:border-purple-500 outline-none placeholder-gray-500 bg-transparent transition
                ${error ? "border-red-600" : "border-gray-600"}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <FormErrorMessage error={error} />}
        </div>
    );
};

export default Input;
