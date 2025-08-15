import "./App.css";
import TodoList from "./components/TodoList";
import { ConfigProvider, theme } from "antd";
import { TodosContext } from "./contexts/TodosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { red } from "@ant-design/colors";

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

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <ConfigProvider card={{ className: "to-do-card" }} theme={themeUI}>
      <div className="app">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ConfigProvider>
  );
}

export default App;
