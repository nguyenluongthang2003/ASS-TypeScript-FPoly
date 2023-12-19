import instance from "./Instance";
import { User } from "../interface/User";

export const signUp = (data: User) => {
  return instance.post("/signup", data);
};

export const signIn = (data: User) => {
  return instance.post("/signin", data);
};
