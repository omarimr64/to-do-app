import { Input, Button } from "antd";
import { TodosContext } from "../contexts/TodosContext";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewTodoForm = function () {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
  });

  const { todos, setTodos } = useContext(TodosContext);

  function handleAddNewTodo() {
    const newTodo = {
      id: uuidv4(),
      title: inputData.title,
      description: inputData.description,
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputData({ title: "", description: "" });
  }

  return (
    <form style={{ height: "fit-content", width: "100%", flexShrink: 0 }}>
      <Input
        size="large"
        value={inputData.title}
        placeholder="عنوان المهمة"
        style={{
          direction: "rtl",
          margin: "20px 0 15px",
        }}
        onChange={(e) => {
          setInputData({ ...inputData, title: e.target.value });
        }}
      />

      <Input
        placeholder="وصف المهمة"
        value={inputData.description}
        size="large"
        style={{
          direction: "rtl",
          marginBottom: 15,
        }}
        onChange={(e) => {
          setInputData({ ...inputData, description: e.target.value });
        }}
      />

      <Button
        type="primary"
        style={{ outline: "none" }}
        onClick={handleAddNewTodo}
        disabled={!inputData.title}
      >
        إضافة
      </Button>
    </form>
  );
};

export default NewTodoForm;
