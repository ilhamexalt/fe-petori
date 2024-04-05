import { Modal } from "antd";

export default function ModalComponent({
  open,
  onOk,
  onCancel,
  children,
  confirmLoading,
  width,
}) {
  return (
    <Modal
      id="modal"
      className="modalStyle"
      open={open}
      onOk={onOk}
      okText="Save"
      okButtonProps={{ style: { background: "green", color: "white" } }}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      footer={null}
      width={width}
    >
      {children}
    </Modal>
  );
}
