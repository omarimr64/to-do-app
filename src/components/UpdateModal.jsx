import { Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useMessage } from "../contexts/MessageContext";

const UpdateModal = function ({ todo, modal }) {
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });
  const { isUpdModalOpen, setIsUpdModalOpen } = modal;

  console.log(todo);

  const dispatch = useTodosDispatch();
  const { messageApi } = useMessage();

  useEffect(() => {
    if (!todo) return;

    const currentTodoData = {
      title: todo.title,
      description: todo.description,
    };
    setEditTodo(currentTodoData);
  }, [isUpdModalOpen]);

  function handleUpdateTodo() {
    dispatch({ type: "updated", payload: { todo, editTodo } });

    messageApi.open({
      type: "success",
      content: "تم تعديل المهمة بنجاح",
    });
    setIsUpdModalOpen(false);
  }

  return (
    <>
      {/* UPDATE MODAL */}
      <Modal
        title="تعديل المهمة"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isUpdModalOpen}
        okText={`تعديل`}
        cancelText={`إلغاء`}
        okType="primary"
        style={{
          direction: "rtl",
          textAlign: "right",
        }}
        centered
        onOk={handleUpdateTodo}
        onCancel={() => setIsUpdModalOpen(false)}
        className="modal"
        okButtonProps={{ disabled: !editTodo.title ? "disableOk" : null }}
      >
        <Input
          size="large"
          value={editTodo.title ? editTodo.title : ""}
          placeholder="عنوان المهمة"
          style={{
            direction: "rtl",
            margin: "20px 0 15px",
          }}
          onChange={(e) => {
            setEditTodo({ ...editTodo, title: e.target.value });
          }}
        />

        <Input
          placeholder="وصف المهمة"
          value={editTodo.description ? editTodo.description : ""}
          size="large"
          style={{
            direction: "rtl",
            marginBottom: 15,
          }}
          onChange={(e) => {
            setEditTodo({ ...editTodo, description: e.target.value });
          }}
        />
      </Modal>
    </>
  );
};

export default UpdateModal;
