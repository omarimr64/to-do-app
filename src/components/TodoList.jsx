import { Typography, Card, Segmented, Button, Input } from "antd";
import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import NewTodoForm from "./NewTodoForm";

const { Title } = Typography;

const TodoList = function () {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const renderedTodos = function () {
    if (displayedTodosType === "all") return todos;
    if (displayedTodosType === "completed")
      return todos.filter((t) => t.isCompleted);
    if (displayedTodosType === "uncompleted")
      return todos.filter((t) => !t.isCompleted);
  };

  const todosList = renderedTodos().map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) setTodos(storageTodos);
  }, []);

  return (
    <>
      <Card
        title={<Title>قائمة المهام</Title>}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: 0,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            padding: 24,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            flexGrow: 1,
          },
          header: {
            flexShrink: 0,
            borderRadius: 0,
          },
        }}
      >
        {/* CONTENT */}

        {/* FILTERING */}
        <Segmented
          size="large"
          options={[
            { label: "الكل", value: "all" },
            { label: "المكتمل", value: "completed" },
            { label: "الغير مكتمل", value: "uncompleted" },
          ]}
          direction="rtl"
          style={{ marginBottom: "15px" }}
          value={displayedTodosType}
          onChange={(value) => setDisplayedTodosType(value)}
        />

        {/* TO DO LIST */}
        <div
          style={{
            overflowY: "auto",
            // height: "48vh",
            width: "100%",
            flexGrow: 1,
            scrollbarWidth: "none",
          }}
        >
          {todos.length ? null : (
            <Title
              level={2}
              style={{
                color: "#4F4F4F",
                margin: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              لا يوجد مهام
            </Title>
          )}
          {todosList}
        </div>

        {/* FORM */}
        <NewTodoForm />
      </Card>
    </>
  );
};

export default TodoList;
