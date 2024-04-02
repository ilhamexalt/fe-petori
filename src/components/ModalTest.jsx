// Modal.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, saveModal } from "../redux/features/modalSlice";
import FormInputService from "./FormInputService";

const ModalTest = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <div className="modal">
      {isOpen && (
        <div className="modal">
          <FormInputService />
        </div>
      )}
    </div>
  );
};

export default ModalTest;
