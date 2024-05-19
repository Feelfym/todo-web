import React from "react";
import { Checkbox, Text, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";
import TaskDetailModal from "./TaskDetailModal";
import TaskEditModal from "./TaskEditModal";

const Task = (props) => {
  const detailDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  return (
    <tr>
      <td>
        <Flex justifyContent="center" alignItems="center">
          <Checkbox
            isChecked={props.isDone}
            colorScheme="blue"
            size="lg"
            onChange={() => {
              props.toggleIsDone(props.id, props.index);
            }}
          />
        </Flex>
      </td>
      <td>
        <Text as={props.isDone ? "s" : "span"} color={new Date(props.dueDate) < new Date() ? "red" : "black"}>
          {props.name}
          <IconButton
            icon={<InfoIcon />}
            size="sm"
            onClick={detailDisclosure.onOpen}
            aria-label="Show details"
            ml="4"
          />
          <IconButton
            icon={<EditIcon />}
            size="sm"
            onClick={editDisclosure.onOpen}
            aria-label="Edit task"
            ml="4"
          />
        </Text>
        <TaskDetailModal isOpen={detailDisclosure.isOpen} onClose={detailDisclosure.onClose} task={props} />
        <TaskEditModal isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose} task={props} />
      </td>
      <td>
        <Text color="gray">{props.createdAt}</Text>
      </td>
      <td>
        <Text color="gray">{new Date(props.dueDate).toLocaleDateString()}</Text>
      </td>
      <td>
        <Flex justifyContent="center" alignItems="center">
          <IconButton
            icon={<CloseIcon />}
            size="sm"
            onClick={() => props.destroyTask(props.id)}
            aria-label="Delete task"
          />
        </Flex>
      </td>
    </tr>
  );
};

export default Task;
