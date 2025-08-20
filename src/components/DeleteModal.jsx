import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { Modal } from "antd";

const DeleteModal = function ({ todo, modal }) {
  const { isDelModalOpen, setIsDelModalOpen } = modal;
  const { todos, setTodos } = useContext(TodosContext);

  function handleDeleteTodo() {
    const updatedTodos = [...todos.filter((t) => t.id !== todo.id)];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
