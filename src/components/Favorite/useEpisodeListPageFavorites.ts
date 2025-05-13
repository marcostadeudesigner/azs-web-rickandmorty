import { useEffect } from "react";
import { useLocalStorageSyncedState } from "@/src/hooks/useLocalStorage";

const useEpisodeListPageFavorites = ()=> {

    const [favorites, setFavorites] = useLocalStorageSyncedState<string[]>(
        'favorites', 
        []
    );
    const toggleFavorite = (episodeId: string) => {
        setFavorites(prev => 
            prev.includes(episodeId)
            ? prev.filter(id => id !== episodeId)
            : [...prev, episodeId]
        );
    };

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return {
        favorites,
        toggleFavorite
    }

}

export { useEpisodeListPageFavorites };