import { Button, Form, Input, notification, } from "antd";
import { getOneCategory, updateCategory } from "../../../api/Category";
import { ICategory } from "../../../interface/Categories";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const CategoriesUpdate = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [category, setCategory] = useState<ICategory>()
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const setFields = () => {
        form.setFieldsValue({
            id: category?.id,
            name: category?.name,
        });
    };

    useEffect(() => {
        setFields()
    }, [category])

    const fetchCategoryById = async(id: number) => {
        try {
            const {data} = await getOneCategory(id)
            setCategory(data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchCategoryById(id)
    },[])

    const onFinish = async ( category: ICategory) => {
        try {
            await updateCategory(id, category);
            api["success"]({
                message: "Add successfull",
            });
            setTimeout(() => {
                navigate('/admin/category')
            }, 1000);
        } catch (error) {
            console.log("Failed:", error);

        }
    };

    const validateMessages = {
        required: "Must not be empty"
    };

    return (
        <>
            <p className="title">Add Category</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}>
                <Form.Item
                    label="Category name"
                    name="name"
                    rules={[{ required: true, message: "Please insert category name!" }]}
                >
                    <Input placeholder="Insert category name" />
                </Form.Item>
                <Form.Item>
                    {contextHolder}
                    <Button

                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CategoriesUpdate;
