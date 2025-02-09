import React, { useEffect, useState } from "react";
import { Input, Button, List, Checkbox, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = "todoList";

export const App: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // При любом изменении списка, добавляем его в LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
            <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)}>
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};
