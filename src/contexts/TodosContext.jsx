import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

const TodosContext = createContext([]);
const DispatchContext = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(DispatchContext);
