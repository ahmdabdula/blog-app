import { ReactComponentElement, useEffect } from "react";
import { InputHTMLAttributes, FC } from "react";
import { useState } from "react";

type FormInputProps = {
  placeholder: string;
  valid: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputBar: FC<FormInputProps> = ({ placeholder, ...otherProps }) => {
  let border: string;
  if (otherProps.valid) {
    border = "border-primary";
  } else {
    border = "border-secondary";
  }

  return (
    <input
      className={
        "w-full border-2 p-5 rounded-none mt-8 focus:outline-none " + border
      }
      placeholder={placeholder}
      {...otherProps}
    ></input>
  );
};

export default InputBar;
