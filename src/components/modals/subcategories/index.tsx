import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createCategory, getSubCategory, getCategories } = useCategoryStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const category = {
      category_name: values.category_name,
      parent_category_id: Number(id),
    };
    const response = await createCategory(category);
    if (response?.status === 201) {
      setIsModalVisible(false);
      form.resetFields();
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        size="large"
        type="primary"
      >
        Add New Subategory
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add New Category"
        footer={null}
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="category_name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
              iconPosition="end"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyModal;
