import React, { ButtonHTMLAttributes, FC, InputHTMLAttributes } from "react";

type ButtonProps = {
  name: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ name, ...otherProps }) => {
  return (
    <button className="w-2/6  p-5 bg-dark text-white my-6 hover:opacity-90">
      <h1 className="font-lexend text-2xl">{name}</h1>
    </button>
  );
};

export default Button;
