import {
  createContext,
  useReducer,
  PropsWithChildren,
  Reducer,
  Dispatch,
} from "react";

export type blogType = {
  title: string;
  date: Date;
  author: string;
  content: string;
  id: string;
  userId: string;
};

export const BLOG_ACTION_TYPES = {
  SET_BLOGS: "SET_BLOGS",
  REMOVE_BLOGS: "REMOVE_BLOGS",
};

export type ACTIONTYPE =
  | { type: string; payload: blogType[] }
  | { type: string; payload: null };

export type BlogStateType = {
  blogs: blogType[] | null;
  dispatch: Dispatch<ACTIONTYPE>;
};

const INITIAL_STATE: BlogStateType = {
  blogs: null,
  dispatch: () => null,
};

export const BlogsContext = createContext<BlogStateType>(INITIAL_STATE);

const blogsReducer: Reducer<BlogStateType, ACTIONTYPE> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case BLOG_ACTION_TYPES.SET_BLOGS:
      return { ...state, blogs: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const BlogsProvider = ({ children }: PropsWithChildren) => {
  const [blogState, dispatch] = useReducer(blogsReducer, INITIAL_STATE);

  const { blogs } = blogState;

  return (
    <BlogsContext.Provider value={{ blogs, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};
