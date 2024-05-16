import React, { useState, useEffect } from "react";
import TaskForm from "./component/TaskForm";
import TaskList from "./component/TaskList";
import { Flex, Box, Center, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { fetchTasks, createTask, toggleTaskStatus } from "./api/taskApi";
import { addOneDay } from "./utils/dateUtils";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(addOneDay(new Date()));
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetch = async () => {
    const tasks = await fetchTasks();
    sortTasks(tasks);
  };

  const sortTasks = (tasks) => {
    const sortedTasks = tasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.due_date) - new Date(b.due_date);
      } else {
        return new Date(b.due_date) - new Date(a.due_date);
      }
    });
    setTasks(sortedTasks);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortTasks(tasks);
  };

  const createTaskHandler = async () => {
    await createTask(name, dueDate);
    setName("");
    fetch();
  };

  const destroyTask = async (id) => {
    await axios.delete(`http://localhost:3010/tasks/${id}`);
    fetch();
  }

  useEffect(() => {
    fetch();
  }, []);

  const toggleIsDone = async (id, index) => {
    const isDone = tasks[index].is_done;
    await toggleTaskStatus(id, isDone);
    fetch();
  }

  return (
    <form onSubmit={createTaskHandler}>
      <Box mt="64px" width="100%">
        <Center>
          <Box width="60%">
            <Box mb="24px">
              <Text fontSize="24px" fontWeight="bold">
                タスク一覧
              </Text>
            </Box>
            <TaskForm
              name={name}
              setName={setName}
              dueDate={dueDate}
              setDueDate={setDueDate}
              createTask={createTaskHandler}
            />
            <TaskList
              tasks={tasks}
              showCompleted={showCompleted}
              toggleIsDone={toggleIsDone}
              destroyTask={destroyTask}
              toggleSortOrder={toggleSortOrder}
              sortOrder={sortOrder}
              setShowCompleted={setShowCompleted}
            />
          </Box>
        </Center>
      </Box>
    </form>
  );
};

export default App;
