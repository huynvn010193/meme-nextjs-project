import { createGlobalState } from "react-hooks-global-state";

type TypeCurrentUser = {
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
}

type TypeInitState = {
  token?: string;
  categories: TypeCategory[],
  currentUser: TypeCurrentUser | null;
};

const initialState: TypeInitState = {
  token:'',
  categories: [],
  currentUser: null,
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
