import { useRef, useEffect } from "react";

const useEpisodeSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
            inputRef.current?.focus();
    }, []);

    return {
        inputRef
    }
}
 export { useEpisodeSearch };