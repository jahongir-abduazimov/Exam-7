import useCategoryStore from "../../../store/category";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
const MyModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createCategory } = useCategoryStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (value: any) => {
    setLoading(true);
    const response = await createCategory(value);
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
        Add New Category
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        title="Add new category"
        footer
        style={{ maxWidth: "450px" }}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={(values) => handleSubmit(values)}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
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
