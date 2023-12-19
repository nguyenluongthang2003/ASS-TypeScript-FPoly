import * as Yup from "yup";

export const productSchema = Yup.object({
    title: Yup.string().required("Khong duowc bo trong"),
  brand: Yup.string().required("Khong duowc bo trong"),
  image : Yup.string().required("Khong duowc bo trong"),
  description: Yup.string()
    .min(10, "Toi thieu 10 ky tu")
    .required("Khon duoc bo trong"),
    price: Yup.number().required("Khong duowc bo trong"),
  origcategoryin: Yup.string().required("Khong duowc bo trong"),
});

export type ProductForm = Yup.InferType<typeof productSchema>;
