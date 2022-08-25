import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import InputBar from "../forminput/inputbar";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../routes/authentication/authentication";
import { checkFieldValidation } from "../../utils/formValidation";
import Alert from "../alerts/alert";

const defaultFormFields = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const defaultFormValidation = {
  email: false,
  password: false,
  name: false,
};

function Signup() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formValidation, setFormValidation] = useState(defaultFormValidation);
  const [alertMessage, setAlertError] = useState<string>("");
  const [alertPop, setAlertPop] = useState<boolean>(false);
  const { email, password, name, confirmPassword } = formFields;
  const DomProps: { heading: string; SetHeading: (arg: string) => {} } =
    useOutletContext();
  DomProps.SetHeading("Sign Up");

  const validateField = (name: string, value: string) => {
    const { state, message } = checkFieldValidation(name, value);
    setAlertError(message);
    setFormValidation({ ...formValidation, [name]: state });
    setAlertPop(!state);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
    setFormFields({ ...formFields, [name]: value });
  };

  const validateForm = (): boolean => {
    return formValidation.email &&
      formValidation.name &&
      formValidation.password &&
      password == confirmPassword
      ? true
      : false;
  };

  return (
    <div>
      <a className="font-light text-3xl text-secondary">
        Let's sign you up quickly
      </a>
      <InputBar
        placeholder="Full Name"
        valid={formValidation.name}
        type="text"
        onChange={handleChange}
        required
        name="name"
        value={name}
      ></InputBar>

      <InputBar
        placeholder="Email Address"
        valid={formValidation.email}
        type="email"
        onChange={handleChange}
        required
        name="email"
        value={email}
      ></InputBar>

      <InputBar
        placeholder="Password"
        type="password"
        valid={formValidation.password}
        required
        onChange={handleChange}
        name="password"
        value={password}
      ></InputBar>

      <InputBar
        placeholder="Confirm Password"
        type="password"
        valid={password === confirmPassword && password.length > 0}
        required
        onChange={handleChange}
        name="confirmPassword"
        value={confirmPassword}
      ></InputBar>

      <Button disabled={!validateForm()} name="SUBMIT"></Button>

      <Link to={"/"}>
        <h1 className="text-xl hover:opacity-75">
          Already have an account?
          <a className="text-primary px-2 ">Log-in</a>
        </h1>
      </Link>

      {alertPop && (
        <Alert closeAlert={setAlertPop} message={alertMessage}></Alert>
      )}
    </div>
  );
}

export default Signup;
