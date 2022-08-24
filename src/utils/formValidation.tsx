import React from "react";

export const validateEmail = (email: string): boolean => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return true;
  } else return false;
};

export const validatePassword = (password: string): boolean => {
  if (password.length > 6) {
    return true;
  } else return false;
};

export const validateText = (text: string): boolean => {
  if (text.length > 1) {
    return true;
  } else return false;
};

export const checkFieldValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (
        String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        return { state: true, message: "success" };
      } else return { state: false, message: "Email Must be Correct" };
      break;
    case "password":
      if (value.length > 6) {
        return { state: true, message: "success" };
      } else
        return { state: false, message: "Password must be 6 characters long" };
    default:
      if (value.length > 0) {
        return { state: true, message: "success" };
      } else return { state: true, message: "Name is required" };
  }
};
