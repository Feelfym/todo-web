import axios from "axios";

export const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3010/tasks");
  return res.data;
};

export const createTask = async (name, dueDate) => {
  await axios.post("http://localhost:3010/tasks", {
    name: name,
    is_done: false,
    due_date: dueDate
  });
};

export const toggleTaskStatus = async (id, isDone) => {
  await axios.put(`http://localhost:3010/tasks/${id}`, {
    is_done: !isDone,
  });
};