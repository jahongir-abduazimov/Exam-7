import { Button, Modal } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import useBrandCategoryStore from "../../../store/brand-category";
import {SomeComponentProps} from "@interfaces";

const MyModal: React.FC<SomeComponentProps> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteBrandCategory } = useBrandCategoryStore();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteData = async (id: number) => {
    setLoading(true);
    const response = await deleteBrandCategory(id);
    if (response?.status === 200) {
      setIsModalVisible(false);
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        icon={<DeleteOutlined />}
      />
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
        title="Delete this brand category?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              iconPosition="end"
              size="large"
              type="primary"
              onClick={() => deleteData(record.id)}
            >
              Ok
            </Button>
          </div>
        }
      />
    </>
  );
};
export default MyModal;
