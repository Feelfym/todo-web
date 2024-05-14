import React, { useState, useEffect } from "react";
import TaskForm from "./component/TaskForm";
import TaskTable from "./component/TaskTable";
import { Flex, Box, Center, Text, Button } from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const addOneDay = (date) => {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    const year = result.getFullYear();
    const month = String(result.getMonth() + 1).padStart(2, '0');
    const day = String(result.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [dueDate, setDueDate] = useState(addOneDay(new Date()));
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetch = async () => {
    const res = await axios.get("http://localhost:3010/tasks");
    sortTasks(res.data);
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
              createTask={createTask}
            />
            <TaskTable
              tasks={tasks}
              showCompleted={showCompleted}
              toggleIsDone={toggleIsDone}
              destroyTask={destroyTask}
            />
            <Flex mt="24px" justifyContent="space-between">
              <Button
                colorScheme="teal"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? "完了タスクを非表示" : "完了タスクを表示"}
              </Button>
              <Button 
                ml="16px" 
                mr="60px"
                colorScheme="teal"
                onClick={toggleSortOrder}>
                {sortOrder === "asc" ? "期日を降順に並び替え" : "期日を順に並び替え"}
              </Button>
            </Flex>
          </Box>
        </Center>
      </Box>
    </form>
  );
};

export default App;
