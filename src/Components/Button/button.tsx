import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = {
  name: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ name, ...otherProps }) => {
  let backgroundStyle: string;
  otherProps.disabled
    ? (backgroundStyle = "bg-secondary")
    : (backgroundStyle = "bg-dark hover:bg-primary");

  return (
    <button
      {...otherProps}
      className={"lg:w-2/6 w-full p-5 text-white my-6 " + backgroundStyle}
    >
      <h1 className="font-lexend lg:text-2xl text-xl">{name}</h1>
    </button>
  );
};

export default Button;