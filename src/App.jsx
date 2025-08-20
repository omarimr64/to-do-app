import "./App.css";
import TodoList from "./components/TodoList";
import { ConfigProvider, theme, message } from "antd";
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";
import { red } from "@ant-design/colors";
import { MessageContext } from "./contexts/MessageContext";

const themeUI = {
  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      colorErrorHover: red.primary,
      colorError: "default",
    },
  },

  // 2. Combine dark algorithm and compact algorithm
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

const initialTodos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, and bread",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Study React",
    description: "Finish the hooks section",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Workout",
    description: "30 minutes of cardio",
    isCompleted: true,
  },
  {
    id: 4,
    title: "Call Mom",
    description: "Catch up and ask about the weekend",
    isCompleted: false,
  },
  {
    id: 5,
    title: "Read a book",
    description: "Continue reading 'Atomic Habits'",
    isCompleted: true,
  },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ConfigProvider card={{ className: "to-do-card" }} theme={themeUI}>
      <div className="app">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <MessageContext.Provider value={{ messageApi }}>
            <TodoList />
            {contextHolder}
          </MessageContext.Provider>
        </TodosContext.Provider>
      </div>
    </ConfigProvider>
  );
}

export default App;
