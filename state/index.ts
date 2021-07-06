import { createGlobalState } from "react-hooks-global-state";

export type TypeUser = {
  USERID: string;
  email: string;
  gender: string;
  description: string;
  fullname: string;
  profilepicture: string;
  permission: string;
};

type TypeCategory = {
  text: string;
  id: number;
};

type TypeInitState = {
  token?: string;
  categories: TypeCategory[];
  currentUser: TypeUser | null;
};

const initialState: TypeInitState = {
  token: "",
  categories: [],
  currentUser: null,
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
