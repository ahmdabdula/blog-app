import {
  createContext,
  useEffect,
  useReducer,
  PropsWithChildren,
  Reducer,
  Dispatch,
} from "react";

import { createAction } from "../Utils/Reducer/reducerUtils";
import { onAuthStateChangedListener } from "../Utils/Firebase/firebase";

export type UserType = {
  uid: string;
  name: string;
  email: string;
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

export type ACTIONTYPE =
  | { type: string; payload: UserType }
  | { type: string; payload: null };

export type UserStateType = {
  currentUser: UserType | null;
  dispatch: Dispatch<ACTIONTYPE>;
};

const INITIAL_STATE: UserStateType = {
  currentUser: null,
  dispatch: () => null,
};

export const UserContext = createContext<UserStateType>(INITIAL_STATE);

const userReducer: Reducer<UserStateType, ACTIONTYPE> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [User, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: UserType | null) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      let userContext: UserType | null = null;
      if (user) {
        userContext = {
          uid: user.uid,
          name: user.displayName as string,
          email: user.email as string,
        };
        setCurrentUser(userContext);
        window.localStorage.setItem("currentUser", JSON.stringify(userContext));
      }
    });

    return unsubscribe;
  }, []);

  const { currentUser } = User;

  return (
    <UserContext.Provider value={{ currentUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
