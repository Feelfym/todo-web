import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, CheckboxGroup } from "@chakra-ui/react";
import Task from "./Task";

const TaskTable = ({ tasks, showCompleted, toggleIsDone, destroyTask }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>完了チェック</Th>
          <Th>タスク名</Th>
          <Th>追加日</Th>
          <Th>期日</Th>
          <Th>操作</Th>
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
              />
            );
          })}
        </CheckboxGroup>
      </Tbody>
    </Table>
  );
};

export default TaskTable;