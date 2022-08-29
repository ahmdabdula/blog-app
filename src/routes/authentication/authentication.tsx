import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import BgImg from "../../Images/login-signup-bg.png";

const Authentication = () => {
  const [heading, SetHeading] = useState<string>("Login");
  return (
    <div className="flex w-full h-full">
      <div className="relative w-2/6 h-full lg:block hidden">
        <h1 className="whitespace-nowrap font-lexend font-bold absolute -rotate-90 z-40 text-7xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {heading}
        </h1>
        <img
          className="brightness-75 bg-blend-darken h-full w-full"
          src={BgImg}
          alt=""
        />
      </div>
      <div className="flex lg:w-4/6 lg:text-left justify-center items-center h-full sm:w-6/6 text-center ">
        <div className="w-5/6">
          <h1 className="font-dmSerif lg:text-6xl text-4xl pb-5">Welcome</h1>
          <Outlet context={{ heading, SetHeading }} />
        </div>
      </div>
    </div>
  );
};

export const useUser = () => {
  return useOutletContext<{ heading: string; SetHeading: () => {} }>();
};

export default Authentication;
