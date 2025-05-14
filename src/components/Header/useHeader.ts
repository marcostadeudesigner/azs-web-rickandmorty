import { useEffect, useRef, useState } from "react";

const useHeader = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const isModalOpenRef = useRef(isModalOpen);

        useEffect(() => {
            isModalOpenRef.current = isModalOpen;
        }, [isModalOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (!isModalOpenRef.current) {
            setIsModalOpen(true);
            }
        }
        };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
    
    return{
        isModalOpen,
        setIsModalOpen 
    }
}

export {useHeader};