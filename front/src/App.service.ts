import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:3001" });

export const AppService = {
  getTodos: () => apiClient.get("/todo"),
  createTodo: (title: string) => apiClient.post("/todo", { title }),
  deleteTodo: (id: string) => apiClient.delete("/todo", { params: { id } }),
  completeTodo: (id: string, completed: boolean) => apiClient.patch("/todo", { completed }, { params: { id } }),
};
