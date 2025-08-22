import { useTodosDispatch } from "../contexts/TodosContext";
import { Modal } from "antd";
import { useMessage } from "../contexts/MessageContext";

const DeleteModal = function ({ todo, modal }) {
  const { isDelModalOpen, setIsDelModalOpen } = modal;

  const dispatch = useTodosDispatch();
  const { messageApi } = useMessage();

  function handleDeleteTodo() {
    dispatch({ type: "deleted", payload: todo });

    messageApi.open({
      type: "success",
      content: "تم حذف المهمة بنجاح",
    });
    setIsDelModalOpen(false);
  }

  return (
    <Modal
      title="هل تريد تأكيد الحذف"
      // closable={{ "aria-label": "Custom Close Button" }}
      open={isDelModalOpen}
      okText={`حذف`}
      cancelText={`إلغاء`}
      okType="danger"
      style={{
        direction: "rtl",
        textAlign: "right",
      }}
      centered
      onOk={handleDeleteTodo}
      onCancel={() => setIsDelModalOpen(false)}
      className="modal"
    >
      <p>لا يمكنك التراجع عن الحذف في حال اختيار حذف</p>
    </Modal>
  );
};

export default DeleteModal;
