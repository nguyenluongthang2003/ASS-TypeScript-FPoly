import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
} from "antd";
import { updateCategory } from "../../../api/Category";
import { ICategory } from "../../../interface/Categories";
import { useNavigate, useParams } from "react-router-dom";

type CategoryListProps = {
  categories: ICategory[];
};

const CategoriesUpdate = ( props: CategoryListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<ICategory>();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      id: category?.id,
      name: category?.name,
    });
  };
  useEffect(() => {
    const currentCategory = props.categories.find((category: ICategory) => category.id == id);
    setCategory(currentCategory);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [category]);

  const onFinish = async (category: ICategory) => {
    try {
        await updateCategory(category);
    api["success"]({
      message: "Update successfull",
    });
    setTimeout(() => {
      navigate("/admin/categories")
    }, 1000)
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <>
      <p className="title">
        Update Category
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={category}
      >
        <Form.Item
          name="id"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: "Please insert category name!" }]}
        >
          <Input
            placeholder="Insert category name"
          />
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button
            type="primary"
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