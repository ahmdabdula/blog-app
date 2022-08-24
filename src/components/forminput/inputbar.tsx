import * as React from "react";
import { InputHTMLAttributes, FC } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

type FormInputProps = {
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputBar: FC<FormInputProps> = ({ placeholder, ...otherProps }) => {
  return (
    <input
      className="w-full border-2 border-secondary p-5 rounded-none mt-8"
      placeholder={placeholder}
      {...otherProps}
    ></input>
  );
};

export default InputBar;
