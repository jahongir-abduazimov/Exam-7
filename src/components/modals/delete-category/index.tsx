import { Button, Modal } from "antd";
import { useState } from "react";
import useCategoryStore from "../../../store/category";
import { DeleteOutlined } from "@ant-design/icons";

const MyModal: React.FC = ({record}:any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteCategory, getCategories } = useCategoryStore();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteData = async (id: number) => {
      const response = await deleteCategory(id);
      if (response.status === 200) {
        setIsModalVisible(false);
        getCategories();
    }
  }
  return (
    <>
      <Button onClick={() => setIsModalVisible(true)} icon={<DeleteOutlined />} />
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "400px" }}
        title="Delete this category?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="large" type="primary" onClick={()=>deleteData(record.id)}>
                Ok
            </Button>
          </div>
        }
      />
    </>
  );
};
export default MyModal;
