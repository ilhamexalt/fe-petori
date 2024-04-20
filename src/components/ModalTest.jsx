// ModalComponent.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/features/modalSlice";
import { Modal } from "antd";

export default function ModalTest({ onOk, children, confirmLoading, width }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      id="modal"
      className="modalStyle"
      open={isOpen}
      onOk={isOpen}
      okText="Save"
      okButtonProps={{ style: { background: "green", color: "white" } }}
      confirmLoading={confirmLoading}
      onCancel={handleClose}
      footer={null}
      width={width}
    >
      {children}
    </Modal>
  );
}
