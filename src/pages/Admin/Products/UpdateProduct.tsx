import { Button, Form, Input, Select, notification, } from "antd";
import { updateProduct, getOneProduct } from "../../../api/Products";
import { Product } from "../../../interface/Product";
import { ICategory } from "../../../interface/Categories";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>()
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const setFields = () => {
        form.setFieldsValue({
            id: product?.id,
            name: product?.title,
            price: product?.price,
            image: product?.image,
            description: product?.description,
            categoryId: product?.categoryId,
        });
    };

    const fetchProductById = async (id: number) => {
        try {
            const { data } = await getOneProduct(id)
            setProduct(data)
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        if (id) {
            fetchProductById(id)
        }
    }, [])

    useEffect(() => {
        setFields();
    }, [product]);

    const onFinish = async (product: Product) => {

        console.log(product);
        
        try {
            await updateProduct(id,product);
            api["success"]({
                message: "Updated successfull",
            });
            setTimeout(() => {
                navigate("/admin/product")
            }, 1000)
        } catch (error) {
            console.log("Failed:", error);

        }
    };


    // call api categories
    const [categories, setCategories] = useState<ICategory[]>([]);

    const fetchCategories = async () => {
        const { data } = await axios.get('http://localhost:3000/categories');
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <p className="title">Add Product</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Product name"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Insert product name" />
                </Form.Item>
                <Form.Item
                    label="Product image"
                    name="image"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Insert product thumbnail" />
                </Form.Item>
                <Form.Item
                    label="Product price"
                    name="price"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Insert product price" />
                </Form.Item>
                <Form.Item
                    label="Product description"
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea rows={4} placeholder="Insert product description" />
                </Form.Item>
                <Form.Item label="Category" required name="categoryId">
                    <Select>
                        {categories.map((category) => {
                            return (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}
                                    label={category.name}
                                >
                                    {category.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    {contextHolder}
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UpdateProduct;
