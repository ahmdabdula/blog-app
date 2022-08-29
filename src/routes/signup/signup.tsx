import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { checkFieldValidation } from "../../Utils/formValidation";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../Utils/Firebase/firebase.utils";
import Button from "../../Components/Button/button";
import Alert from "../../Components/Alerts/alert";
import InputBar from "../../Components/Forminput/inputBar";

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

const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formValidation, setFormValidation] = useState(defaultFormValidation);
  const [alertMessage, setAlertError] = useState<string>("");
  const [alertPop, setAlertPop] = useState<boolean>(false);
  const { email, password, name, confirmPassword } = formFields;
  const DomProps: { heading: string; SetHeading: (arg: string) => {} } =
    useOutletContext();
  DomProps.SetHeading("Sign Up");

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

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

  const handleSubmit = async () => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential) {
        const { user } = userCredential;
        await createUserDocumentFromAuth(user, { name });
        resetForm();
      }
    } catch (error: unknown) {
      setAlertPop(true);
      console.log(error);
      //setAlertError(error as string);
    }
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
        isValid={formValidation.name}
        type="text"
        onChange={handleChange}
        required
        name="name"
        value={name}
      ></InputBar>

      <InputBar
        placeholder="Email Address"
        isValid={formValidation.email}
        type="email"
        onChange={handleChange}
        required
        name="email"
        value={email}
      ></InputBar>

      <InputBar
        placeholder="Password"
        type="password"
        isValid={formValidation.password}
        required
        onChange={handleChange}
        name="password"
        value={password}
      ></InputBar>

      <InputBar
        placeholder="Confirm Password"
        type="password"
        isValid={password === confirmPassword && password.length > 0}
        required
        onChange={handleChange}
        name="confirmPassword"
        value={confirmPassword}
      ></InputBar>

      <Button
        disabled={!validateForm()}
        onPress={handleSubmit}
        name="SUBMIT"
      ></Button>

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
};

export default Signup;
