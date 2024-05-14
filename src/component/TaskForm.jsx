import React from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

const TaskForm = ({ name, setName, dueDate, setDueDate, createTask }) => {
  return (
    <Flex mb="24px">
      <Input
        width="100%"
        placeholder="タスク名を入力"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        width="30%"
        ml="16px"
        type="date"
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