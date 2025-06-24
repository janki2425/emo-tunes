import React from 'react';

const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 z-10"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;