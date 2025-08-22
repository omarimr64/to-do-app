import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.inputData.title,
        description: action.payload.inputData.description,
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = [
        ...currentTodos.filter((t) => t.id !== action.payload.id),
      ];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.todo.id)
          return {
            ...t,
            title: action.payload.editTodo.title,
            description: action.payload.editTodo.description,
          };
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "checked": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id)
          return { ...t, isCompleted: !t.isCompleted };
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "read": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default: {
      throw new Error("Unknown action " + action.type);
    }
  }
}
