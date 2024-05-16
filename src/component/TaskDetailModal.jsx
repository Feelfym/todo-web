import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タスク詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>タスク名: {task.name}</Text>
          <Text>追加日: {task.createdAt}</Text>
          <Text>期日: {task.dueDate}</Text>
          <Text>メモ: {task.memo}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailModal;