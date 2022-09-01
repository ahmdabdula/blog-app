import { PropsWithChildren, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import BgImage from "../../Images/login-signup-bg.png";

const Authentication = (props: PropsWithChildren) => {
  const location = useLocation();
  const path = location.pathname.slice(1, location.pathname.length);
  const [pathHeading, SetHeading] = useState<string>(
    path === "signup" ? "Sign Up" : "Login"
  );
  return (
    <div className="flex w-full h-full">
      <div className="relative w-2/6 h-full lg:block hidden">
        <h1 className="whitespace-nowrap font-lexend font-bold absolute -rotate-90 z-40 text-7xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {pathHeading}
        </h1>
        <img
          className="brightness-75 bg-blend-darken h-full w-full"
          src={BgImage}
          alt=""
        />
      </div>
      <div className="flex lg:w-4/6 lg:text-left justify-center items-center h-full sm:w-full text-center ">
        <div className="w-5/6 sm:w-4/6">
          <h1 className="font-dmSerif lg:text-5xl text-4xl pb-2">Welcome</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const useUser = () => {
  return useOutletContext<{ heading: string; SetHeading: () => {} }>();
};

export default Authentication;
