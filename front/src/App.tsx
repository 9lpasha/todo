import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Input, Button, List, Checkbox, Space, Spin, message } from "antd";

import { AppService } from "./App.service";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await AppService.getTodos();
        setTasks(data);
      } catch (error) {
        message.error("Ошибка загрузки задач");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTask = () => {
    if (!taskText.trim()) return;

    AppService.createTodo(taskText.trim());

    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (editedTask: Task) => {
    AppService.completeTodo(editedTask.id, !editedTask.completed);

    setTasks(tasks.map((task) => (task.id === editedTask.id ? { ...task, completed: !task.completed } : task)));
  };

  const removeTask = (id: string) => {
    AppService.deleteTodo(id);

    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Введите задачу"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onPressEnter={addTask}
        />
        <Button type="primary" onClick={addTask}>
          Добавить
        </Button>
      </Space.Compact>
      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            actions={[<Button type="link" icon={<DeleteOutlined />} onClick={() => removeTask(task.id)} />]}
          >
            <Checkbox checked={task.completed} onChange={() => toggleTask(task)}>
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};
