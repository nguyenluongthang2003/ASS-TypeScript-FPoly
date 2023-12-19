import { ICategory } from "../interface/Categories";
import instance from "./Instance";

export const getAllCategory = () => {
    return instance.get('/categories');
}
export const getOneCategory = (id:number) => {
    return instance.get('/categories/' + id);
}
export const addCategory = (category:ICategory) => {
    return instance.post('/categories', category);
}
export const updateCategory = (id : number, category:ICategory) => {
    return instance.patch('/categories/' + id, category);
}
export const deleteCategory = (id:number) => {
    return instance.delete('/categories/' + id);
}
