import React from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

const TaskForm = ({ name, setName, dueDate, setDueDate, createTask }) => {
  return (
    <Flex mb="24px">
      <Input
        placeholder="タスク名を入力"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        ml="16px"
        type="date"
        placeholder="期日を入力"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Box ml="16px">
        <Button colorScheme="teal" onClick={createTask}>
          タスクを作成
        </Button>
      </Box>
    </Flex>
  );
};

export default TaskForm;