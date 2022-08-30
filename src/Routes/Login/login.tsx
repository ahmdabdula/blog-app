import { ChangeEvent, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../../Components/Button/button";
import Alert from "../../Components/Alerts/alert";
import Authentication from "../../Components/Authentication/authentication";
import { checkFieldValidation } from "../../Utils/formValidation";
import { signInAuthUserWithEmailAndPassword } from "../../Utils/Firebase/firebase";
import { UserContext, USER_ACTION_TYPES } from "../../Context/userContext";
import Spinner from "../../Components/Spinner/spinner";
import { UserCredential } from "firebase/auth";
import InputBar from "../../Components/Forminput/inputbar";

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
  const { currentUser, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const setContext = (credentials: UserCredential) => {
    const user = {
      name: credentials?.user?.displayName as string,
      email: email,
      uid: credentials?.user?.uid as string,
    };
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const credentials = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setLoading(false);
      resetForm();
      credentials && setContext(credentials);
    } catch (error: unknown) {
      console.log(error);
      setLoading(false);
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
            />

            <InputBar
              placeholder="Password"
              isValid={password.length > 0}
              type="password"
              required
              onChange={handleChange}
              name="password"
              value={password}
            />

            <div className="flex items-center">
              <Button
                onPress={handleSubmit}
                disabled={!validateForm()}
                name="LOGIN"
              />
              <Spinner visible={loading} />
            </div>

            <div>
              <a className="text-xl hover:opacity-75">Don't have an account?</a>
              <Link className="text-xl text-primary px-2 " to={"/signup"}>
                Sign-up
              </Link>
              {alertPop && (
                <Alert closeAlert={setAlertPop} message={alertMessage} />
              )}
            </div>
          </div>
        </Authentication>
      )}
    </>
  );
};

export default Login;
