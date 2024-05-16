import { Checkbox, Text, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon, InfoIcon } from "@chakra-ui/icons";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>タスク詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>タスク名: {props.name}</Text>
              <Text>追加日: {props.createdAt}</Text>
              <Text>期日: {props.dueDate}</Text>
              <Text>メモ: {props.memo}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                閉じる
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
