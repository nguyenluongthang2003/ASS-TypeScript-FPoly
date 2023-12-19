import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().required("Khong duowc bo trong"),
  email: Yup.string().email("Sai dinh dang").required("Khong duowc bo trong"),
  password: Yup.string().required("Khong duowc bo trong"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Khong khop"),
});

export type SignUpForm = Yup.InferType<typeof signUpSchema>;

export const signInSchema = Yup.object({
  email: Yup.string().email("Sai dinh dang").required("Khong duowc bo trong"),
  password: Yup.string().required("Khong duowc bo trong"),
});

export type SignInForm = Yup.InferType<typeof signInSchema>;
