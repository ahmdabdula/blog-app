import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../button/button";
import InputBar from "../forminput/inputbar";
import { checkFieldValidation } from "../../utils/formValidation";
import Alert from "../alerts/alert";
const defaultFormFields = {
  email: "",
  password: "",
};

const defaultFormValidation = {
  email: false,
  password: false,
  name: false,
};

function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [alertMessage, setAlertError] = useState<string>("");
  const [alertPop, setAlertPop] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState(defaultFormValidation);
  const { email, password } = formFields;
  const DomProps: { heading: string; SetHeading: (arg: string) => {} } =
    useOutletContext();
  DomProps.SetHeading("Login");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { state, message } = checkFieldValidation(name, value);
    if (!state) {
      setAlertError(message);
      setAlertPop(true);
    } else {
      setAlertPop(false);
    }
    setFormFields({ ...formFields, [name]: value });
    setFormValidation({ ...formValidation, [name]: state });
  };

  const validateForm = (): boolean => {
    return formValidation.email && formValidation.password ? true : false;
  };

  return (
    <div>
      <a className="font-light text-3xl text-secondary">
        Lets Log you in quickly
      </a>
      <InputBar
        placeholder="Email Address"
        type="email"
        valid={formValidation.email}
        onChange={handleChange}
        required
        name="email"
        value={email}
      ></InputBar>

      <InputBar
        placeholder="Password"
        valid={formValidation.password}
        type="password"
        required
        onChange={handleChange}
        name="password"
        value={password}
      ></InputBar>

      <Button disabled={!validateForm()} name="LOGIN"></Button>

      <div>
        <a className="text-xl hover:opacity-75">Don't have an account?</a>
        <Link className="text-xl text-primary px-2 " to={"/signup"}>
          Sign-up
        </Link>
        {alertPop && (
          <Alert closeAlert={setAlertPop} message={alertMessage}></Alert>
        )}
      </div>
    </div>
  );
}

export default Login;
