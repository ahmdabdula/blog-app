import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import InputBar from "../forminput/inputbar";

const defaultFormFields = {
  email: "",
  password: "",
};

function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  return (
    <div>
      <a className="font-light text-3xl text-secondary">
        Lets Sign you in quickly
      </a>
      <InputBar
        placeholder="Email Address"
        type="email"
        onChange={handleChange}
        required
        name="email"
        value={email}
      ></InputBar>

      <InputBar
        placeholder="Password"
        type="password"
        required
        onChange={handleChange}
        name="password"
        value={password}
      ></InputBar>

      <Button name="LOGIN"></Button>

      <Link to={"/signup"}>
        <h1 className="text-xl hover:opacity-75">
          Don't have an account?
          <a className="text-primary px-2 ">Sign-up</a>
        </h1>
      </Link>
    </div>
  );
}

export default Login;
