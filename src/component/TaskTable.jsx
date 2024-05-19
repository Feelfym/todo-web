import React from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, CheckboxGroup } from "@chakra-ui/react";
import Task from "./Task";

const TaskTable = ({ tasks, showCompleted, toggleIsDone, destroyTask }) => {
  
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th width="9%"><Flex justifyContent="center">完了</Flex></Th>
          <Th width="50%">タイトル</Th>
          <Th width="10%">追加日</Th>
          <Th width="10%"><></>期日</Th>
          <Th width="7%"><Flex justifyContent="center">操作</Flex></Th>
        </Tr>
      </Thead>
      <Tbody>
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
                createdAt={new Date(task.created_at).toLocaleDateString()}
                dueDate={new Date(task.due_date).toLocaleDateString()}
                memo={task.memo}
              />
            );
          })}
        </CheckboxGroup>
      </Tbody>
    </Table>
  );
};

export default TaskTable;
