import axios from "axios";

// すべてのタスクを取得する
export const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3010/tasks");
  return res.data;
};

// 新しいタスクを作成する
export const createTask = async (name, dueDate) => {
  await axios.post("http://localhost:3010/tasks", {
    name: name,
    is_done: false,
    due_date: dueDate
  });
};

// タスクのステータスを切り替える
export const toggleTaskStatus = async (id, isDone) => {
  await axios.put(`http://localhost:3010/tasks/${id}`, {
    is_done: !isDone,
  });
};

// タスクを削除する
export const destroyTask = async (id) => {
  await axios.delete(`http://localhost:3010/tasks/${id}`);
};

// タスクを更新する
export const updateTask = async (id, updatedTask) => {
  await axios.put(`http://localhost:3010/tasks/${id}`, updatedTask);
};