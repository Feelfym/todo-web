import React, { useState, useEffect } from "react";
import Task from "./component/Task";
import {
  Flex,
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const fetch = async () => {
    const res = await axios.get("http://localhost:3010/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post("http://localhost:3010/tasks", {
      name: name,
      is_done: false,
    });
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
            <Flex mb="24px">
              <Input
                placeholder="タスク名を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Box ml="16px">
                <Button colorScheme="teal" onClick={createTask}>
                  タスクを作成
                </Button>
              </Box>
            </Flex>
            <CheckboxGroup>
              {tasks.map((task, index) => {
                if (!showCompleted && task.is_done) {
                  return null;
                }
                return (
                  <Task
                    id={task.id}
                    key={index}
                    index={index}
                    name={task.name}
                    isDone={task.is_done}
                    toggleIsDone={toggleIsDone}
                    destroyTask={destroyTask}
                  />
                );
              })}
            </CheckboxGroup>
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