import React from "react";
import TaskTable from "./TaskTable";
import { Button, Flex } from "@chakra-ui/react";

const TaskList = ({ tasks, showCompleted, toggleIsDone, destroyTask, toggleSortOrder, sortOrder, setShowCompleted }) => {
  return (
    <>
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
    </>
  );
};

export default TaskList;