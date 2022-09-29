import React from 'react';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: JSX.Element;
  title: string;
}

const Modal = ({ visible, onClose, children, title }: ModalProps) => {
  if (!visible) return <></>;
  return (
    <div className='absolute flex justify-center items-center w-full'>
      <div className='bg-white rounded-lg z-10 p-8'>
        <h1 className='text-3xl font-semibold mb-6'>{title}</h1>
        {children}
      </div>
      <div
        className='absolute w-screen h-screen bg-black bg-opacity-40'
        onClick={() => {
          onClose();
        }}
      ></div>
    </div>
  );
};

export default Modal;
