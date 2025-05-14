'use client';

import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

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