'use client';

import { ModalProps } from './Modal.types';
import {useModal} from './useModal';


const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { modalRef } = useModal(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(2,173,199,.65)] flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className=" bg-slate-950 rounded-lg p-6 max-w-md w-full relative min-h-[50vh] max-h-[50vh]">
        <div className="flex justify-between mb-4">
            <h2 className="text-xl">{title}</h2>
            <button
            onClick={onClose}
            className="top-2 right-2 text-white hover:text-teal-200 cursor-pointer"
            >
                X
            </button>
        </div>
        
         
        <div className='  overflow-y-auto relative '>
             {children}
        </div>
      </div>
    </div>
  );
}

export { Modal } ;