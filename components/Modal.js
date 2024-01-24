import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
    console.log("You clicked submit.");
  };

  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-300 bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white border w-[400px] rounded-3xl px-8 py-5">
        <button onClick={handleClose}>X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
