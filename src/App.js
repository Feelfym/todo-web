import React, { useState, useEffect } from "react";
import TaskForm from "./component/TaskForm";
import TaskTable from "./component/TaskTable";

import {
  Box,
  Flex,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  CheckboxGroup,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const fetch = async () => {
    const res = await axios.get("http://localhost:3010/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post("http://localhost:3010/tasks", {
      name: name,
      is_done: false,
      due_date: dueDate
    });
    setName("");
    setDueDate("");
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
    await axios.put(`http://localhost:3010/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
  }

  return (
    <form onSubmit={createTask}>
      <Box mt="64px">
        <Center>
          <Box>
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
              createTask={createTask}
            />
            <TaskTable
              tasks={tasks}
              showCompleted={showCompleted}
              toggleIsDone={toggleIsDone}
              destroyTask={destroyTask}
            />
            <Box mt="24px">
              <Button
                colorScheme="teal"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? "完了タスクを非表示" : "完了タスクを表示"}
              </Button>
            </Box>
          </Box>
        </Center>
      </Box>
    </form>
  );
};

export default App;
