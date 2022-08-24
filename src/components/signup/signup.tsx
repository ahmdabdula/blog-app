import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import InputBar from "../forminput/inputbar";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../routes/authentication/authentication";

const defaultFormFields = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

function Signup() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, name, confirmPassword } = formFields;

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
        placeholder="Full Name"
        type="text"
        onChange={handleChange}
        required
        name="name"
        value={name}
      ></InputBar>

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

      <InputBar
        placeholder="Password"
        type="password"
        required
        onChange={handleChange}
        name="confirmPassword"
        value={confirmPassword}
      ></InputBar>

      <Button name="SUBMIT"></Button>

      <Link to={"/"}>
        <h1 className="text-xl hover:opacity-75">
          Already have an account?
          <a className="text-primary px-2 ">Log-in</a>
        </h1>
      </Link>
    </div>
  );
}

export default Signup;
