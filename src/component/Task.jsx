import { Checkbox, Text, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, InfoIcon } from "@chakra-ui/icons";
import TaskDetailModal from "./TaskDetailModal";

const Task = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <IconButton icon={<InfoIcon />} size="sm" onClick={onOpen} aria-label="Show details" ml="2" />
        </Text>
        <TaskDetailModal isOpen={isOpen} onClose={onClose} task={props} />
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
