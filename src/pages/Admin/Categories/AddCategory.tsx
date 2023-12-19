import {Button,Form,Input,notification,} from "antd";
import { addCategory } from "../../../api/Category";
import { ICategory } from "../../../interface/Categories";
import { useNavigate } from "react-router-dom";


const CategoriesAdd = () => {

  const navigate = useNavigate()

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (category: ICategory) => {
    try {
        await addCategory(category);
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

export default CategoriesAdd;
