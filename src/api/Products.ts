import { Product } from '../interface/Product';
import instance from './Instance';

export const getAllProduct = () => {
    return instance.get('/products');
}
export const getOneProduct = (id:number) => {
    return instance.get('/products/' + id);
}
export const addProduct = (product:Product) => {
    return instance.post('/products', product);
}
export const updateProduct = (id:number ,product:Product) => {
    return instance.put('/products/' + id, product);
}
export const deleteProduct = (id:number) => {
    return instance.delete('/products/' + id);
}


  