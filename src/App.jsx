import "./App.css";
import TodoList from "./components/TodoList";
import { ConfigProvider, theme } from "antd";
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";
import { red } from "@ant-design/colors";
import { MessageProvider } from "./contexts/MessageContext";

const themeUI = {
  algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      colorErrorHover: red.primary,
      colorError: "default",
    },
  },
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

  return (
    <ConfigProvider card={{ className: "to-do-card" }} theme={themeUI}>
      <div className="app">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <MessageProvider>
            <TodoList />
          </MessageProvider>
        </TodosContext.Provider>
      </div>
    </ConfigProvider>
  );
}

export default App;
