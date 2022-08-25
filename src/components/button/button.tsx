import React, { ButtonHTMLAttributes, FC, InputHTMLAttributes } from "react";

type ButtonProps = {
  name: string;
  onPress: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ name, ...otherProps }) => {
  let disabledStyle: string;
  otherProps.disabled
    ? (disabledStyle = "bg-secondary")
    : (disabledStyle = "bg-dark hover:bg-primary");

  return (
    <button
      onClick={() => {
        console.log("helloo");
        otherProps.onPress();
      }}
      {...otherProps}
      className={"lg:w-2/6 w-full p-5 text-white my-6 " + disabledStyle}
    >
      <h1 className="font-lexend lg:text-2xl text-xl">{name}</h1>
    </button>
  );
};

export default Button;
