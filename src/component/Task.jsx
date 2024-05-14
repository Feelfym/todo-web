import { Checkbox, Text, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Task = (props) => {
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
        </Text>
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