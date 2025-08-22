import { Input, Button } from "antd";
import { useState } from "react";
import { useMessage } from "../contexts/MessageContext";
import { useTodosDispatch } from "../contexts/TodosContext";

const NewTodoForm = function () {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
  });

  const { messageApi } = useMessage();
  const dispatch = useTodosDispatch();

  function handleAddNewTodo() {
    dispatch({ type: "added", payload: { inputData } });

    setInputData({ title: "", description: "" });
    messageApi.open({
      type: "success",
      content: "تم إضافة المهمة بنجاح",
    });
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
