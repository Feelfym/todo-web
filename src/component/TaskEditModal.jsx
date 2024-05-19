import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Textarea } from "@chakra-ui/react";
import { format } from 'date-fns';
import { updateTask } from "../api/taskApi";

const TaskEditModal = ({ isOpen, onClose, task }) => {
  const existingDueDate = format(task.dueDate, "yyyy-MM-dd");
  const [name, setName] = useState(task.name || "");
  const [dueDate, setDueDate] = useState(existingDueDate);
  const [memo, setMemo] = useState(task.memo || "");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDueDate(task.dueDate);
      setMemo(task.memo);
    }
  }, [task]);

  const handleSave = async () => {
    await updateTask(task.id, { name, due_date: dueDate, memo });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タスク編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="タスク名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="date"
            value={existingDueDate}
            onChange={(e) => setDueDate(e.target.value)}
            mt={4}
          />
          <Textarea
            placeholder="メモ"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            mt={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            保存
          </Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskEditModal;
