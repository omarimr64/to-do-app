import "./todo.css";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Card, Button, Modal, Input, Checkbox, Typography } from "antd";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import UpdateModal from "./UpdateModal";

const { Title } = Typography;

const Todo = function ({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isUpdModalOpen, setIsUpdModalOpen] = useState(false);

  function handleCheckTodo() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) return { ...t, isCompleted: !t.isCompleted };
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteTodo() {
    const updatedTodos = [...todos.filter((t) => t.id !== todo.id)];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      <label htmlFor={todo.id}>
        <Card
          size="small"
          hoverable
          className={`todo-card ${todo.isCompleted ? "todo-checked" : null}`}
          style={{ marginBottom: 15 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "right",
                gap: 20,
              }}
            >
              <Checkbox
                style={{ transform: "scale(1.4)", marginRight: 5 }}
                checked={todo.isCompleted}
                onChange={() => handleCheckTodo(todo.id)}
                id={todo.id}
              />
              <div>
                {/* DATA */}
                <Title
                  style={{
                    margin: 0,
                    color: todo.isCompleted ? "#4F4F4F" : "initial",
                  }}
                  level={4}
                >
                  {todo.title}
                </Title>

                <p style={{ margin: "4px 0 2px" }}>{todo.description}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {/* ACTIONS */}
              <Button
                style={{ boxShadow: "none", outline: "none" }}
                icon={<EditFilled />}
                disabled={todo.isCompleted}
                onClick={() => setIsUpdModalOpen(true)}
              ></Button>

              <Button
                style={{ boxShadow: "none", outline: "none" }}
                danger
                icon={<DeleteFilled />}
                onClick={() => setIsDelModalOpen(true)}
              ></Button>
            </div>
          </div>
        </Card>
      </label>

      {/* DELETE MODAL */}
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

      <UpdateModal todo={todo} modal={{ isUpdModalOpen, setIsUpdModalOpen }} />
    </>
  );
};

export default Todo;
