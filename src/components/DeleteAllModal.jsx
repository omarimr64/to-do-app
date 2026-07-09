import { useTodosDispatch } from "../contexts/TodosContext";
import { Modal } from "antd";
import { useMessage } from "../contexts/MessageContext";

const DeleteAllModal = function ({ modal }) {
  const { isDelAllModalOpen, setIsDelAllModalOpen } = modal;

  const dispatch = useTodosDispatch();
  const { messageApi } = useMessage();

  function handleDeleteAllTodos() {
    dispatch({ type: "deletedAll" });

    messageApi.open({
      type: "success",
      content: "تم حذف جميع المهام بنجاح",
    });
    setIsDelAllModalOpen(false);
  }

  return (
    <Modal
      title="هل تريد تأكيد الحذف"
      // closable={{ "aria-label": "Custom Close Button" }}
      open={isDelAllModalOpen}
      okText={`حذف`}
      cancelText={`إلغاء`}
      okType="danger"
      style={{
        direction: "rtl",
        textAlign: "right",
      }}
      centered
      onOk={handleDeleteAllTodos}
      onCancel={() => setIsDelAllModalOpen(false)}
      className="modal"
    >
      <p>لا يمكنك التراجع عن الحذف في حال اختيار حذف</p>
    </Modal>
  );
};

export default DeleteAllModal;
