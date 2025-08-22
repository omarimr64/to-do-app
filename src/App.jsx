import "./App.css";
import TodoList from "./components/TodoList";
import { ConfigProvider, theme } from "antd";
import { TodosProvider } from "./contexts/TodosContext";
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

function App() {
  return (
    <ConfigProvider card={{ className: "to-do-card" }} theme={themeUI}>
      <div className="app">
        <TodosProvider>
          <MessageProvider>
            <TodoList />
          </MessageProvider>
        </TodosProvider>
      </div>
    </ConfigProvider>
  );
}

export default App;
