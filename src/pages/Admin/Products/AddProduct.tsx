import {Button,Form,Input,Select, notification,} from "antd";
import { addProduct } from "../../../api/Products";
import { Product } from "../../../interface/Product";
import { ICategory } from "../../../interface/Categories";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {

    
    const navigate = useNavigate()
    const [categories, setCategories] = useState<ICategory[]>([]);

    const fetchCategories = async () => {
        const { data } = await axios.get('http://localhost:3000/categories');
        setCategories(data);
      };

      useEffect(() => {
        fetchCategories();
      }, []);
    
      console.log('result', categories);

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (product: Product) => {
        try {
            await addProduct(product);
        api["success"]({
            message: "Add successfull",
            
        });
        setTimeout(() => {
            navigate("/admin/product")
        }, 1000);
        } catch (error) {
            console.log("Failed:", error);
        }
        
    };

    const validateMessages = {
        required: "Must not be empty",
        types: {
            number: "Number is not a valid!",
        },
        number: {
            range: "Cannot be a negative value",
        },
    };

    return (
        <>
            <p className="title">Add Product</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
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
                    <Button  htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddProduct;
