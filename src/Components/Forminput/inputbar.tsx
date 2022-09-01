import { InputHTMLAttributes, FC } from "react";

type FormInputProps = {
  placeholder: string;
  isValid: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputBar: FC<FormInputProps> = ({ placeholder, ...otherProps }) => {
  let border: string;
  otherProps.isValid
    ? (border = "border-primary")
    : (border = "border-secondary");

  return (
    <input
      autoFocus
      className={
        "w-full border-2 p-5 rounded-none mt-7 focus:outline-none " + border
      }
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default InputBar;
