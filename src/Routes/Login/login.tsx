import { ChangeEvent, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button";
import Alert from "../../Components/Alerts/alert";
import Authentication from "../../Components/Authentication/authentication";
import { checkFieldValidation } from "../../Utils/formValidation";
import { signInAuthUserWithEmailAndPassword } from "../../Utils/Firebase/firebase";
import { UserContext } from "../../Context/userContext";
import InputBar from "../../Components/forminput/inputBar";

const defaultFormFields = {
  email: "",
  password: "",
};

const defaultFormValidation = {
  email: false,
  password: false,
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [alertMessage, setAlertError] = useState<string>("");
  const [alertPop, setAlertPop] = useState<boolean>(false);
  const [formValidation, setFormValidation] = useState(defaultFormValidation);
  const { email, password } = formFields;
  const { currentUser } = useContext(UserContext);

  let navigate = useNavigate();

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async () => {
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      navigate("/");
      resetForm();
    } catch (error: unknown) {
      setAlertPop(true);
      setAlertError(error as string);
    }
  };

  const validateField = (name: string, value: string) => {
    const { state, message } = checkFieldValidation(name, value);
    setAlertError(message);
    setFormValidation({ ...formValidation, [name]: state });
    setAlertPop(!state);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    name == "email" && validateField(name, value);
    setFormFields({ ...formFields, [name]: value });
  };

  const validateForm = (): boolean => {
    return formValidation.email && password.length > 0 ? true : false;
  };

  return (
    <>
      {currentUser ? (
        <Navigate to="/" />
      ) : (
        <Authentication>
          <div className="relative">
            <a className="font-light text-3xl text-secondary">
              Let's log you in quickly
            </a>
            <InputBar
              placeholder="Email Address"
              type="email"
              isValid={formValidation.email}
              onChange={handleChange}
              required
              name="email"
              value={email}
            ></InputBar>

            <InputBar
              placeholder="Password"
              isValid={password.length > 0}
              type="password"
              required
              onChange={handleChange}
              name="password"
              value={password}
            ></InputBar>

            <Button
              onPress={handleSubmit}
              disabled={!validateForm()}
              name="LOGIN"
            ></Button>

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
        </Authentication>
      )}
    </>
  );
};

export default Login;
