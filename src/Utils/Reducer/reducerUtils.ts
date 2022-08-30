import { UserType } from "../../Context/userContext";

export const createAction = (type: string, payload: UserType | null) => ({
  type,
  payload,
});
