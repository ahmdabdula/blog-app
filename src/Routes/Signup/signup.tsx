import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button";
import Alert from "../../Components/Alerts/alert";
import Authentication from "../../Components/Authentication/authentication";
import { checkFieldValidation } from "../../Utils/formValidation";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../Utils/Firebase/firebase";
import InputBar from "../../Components/forminput/inputBar";
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

  let navigate = useNavigate();

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const validateField = (name: string, value: string) => {
    const { state, message } = checkFieldValidation(name, value);
    setAlertError(message);
    setFormValidation({ ...formValidation, [name]: state });
    setAlertPop(!state);
  };

  const handleSubmit = async () => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password,
        name
      );
      if (userCredential) {
        await createUserDocumentFromAuth(userCredential, { name });
      }
      resetForm();
      navigate("/login");
    } catch (error: unknown) {
      setAlertPop(true);
      setAlertError(error as string);
    }
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
    <Authentication>
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

        <Link to={"/login"}>
          <h1 className="text-xl hover:opacity-75">
            Already have an account?
            <a className="text-primary px-2 ">Log-in</a>
          </h1>
        </Link>

        {alertPop && (
          <Alert closeAlert={setAlertPop} message={alertMessage}></Alert>
        )}
      </div>
    </Authentication>
  );
};

export default Signup;
