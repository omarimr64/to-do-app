import "./todo.css";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Card, Button, Checkbox, Typography } from "antd";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { useMessage } from "./../contexts/MessageContext";

const { Title } = Typography;

const Todo = function ({ todo, openDelModal, openUpdModal }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { messageApi } = useMessage();

  function handleCheckTodo() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) return { ...t, isCompleted: !t.isCompleted };
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    if (todo.isCompleted) return;
    messageApi.open({
      type: "success",
      content: "عاش يا بطل",
    });
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
              // flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                display: "flex",
                // flexDirection: "row-reverse",
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
                    color: todo.isCompleted ? "#4F4F4F" : "white",
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
                onClick={() => openUpdModal(todo)}
              ></Button>

              <Button
                style={{ boxShadow: "none", outline: "none" }}
                danger
                icon={<DeleteFilled />}
                onClick={() => {
                  openDelModal(todo);
                }}
              ></Button>
            </div>
          </div>
        </Card>
      </label>
    </>
  );
};

export default Todo;
