import { Typography, Card, Segmented } from "antd";
import Todo from "./Todo";
import { useContext, useEffect, useMemo, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import NewTodoForm from "./NewTodoForm";

const { Title } = Typography;

const TodoList = function () {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const renderedTodos = useMemo(() => {
    if (displayedTodosType === "all") return todos;

    if (displayedTodosType === "completed")
      return todos.filter((t) => t.isCompleted);

    if (displayedTodosType === "uncompleted")
      return todos.filter((t) => !t.isCompleted);
  }, [todos, displayedTodosType]);

  const todosList = renderedTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) setTodos(storageTodos);
  }, []);

  return (
    <>
      <Card
        title={<Title style={{ color: "white" }}>قائمة المهام</Title>}
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          borderRadius: 0,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            padding: 24,
            width: "100vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            flexGrow: 1,
          },
          header: {
            borderRadius: 0,
            height: "fit-content",
          },
        }}
      >
        {/* CONTENT */}

        {/* FILTERING */}
        <div style={{ direction: "ltr" }}>
          <Segmented
            size="large"
            options={[
              { label: "الكل", value: "all" },
              { label: "المكتمل", value: "completed" },
              { label: "الغير مكتمل", value: "uncompleted" },
            ]}
            style={{
              marginBottom: "15px",
              height: "fit-content",
            }}
            value={displayedTodosType}
            onChange={(value) => setDisplayedTodosType(value)}
          />
        </div>

        {/* TO DO LIST */}
        <div
          style={{
            overflowY: "auto",
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
