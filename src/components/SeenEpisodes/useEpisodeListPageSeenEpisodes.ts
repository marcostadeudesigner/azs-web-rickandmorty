import { useEffect } from "react";
import { useLocalStorageSyncedState } from "@/src/hooks/useLocalStorage";

function useEpisodeListPageSeenEpisodes() {
        const [seenEpisodes, setSeenEpisodes] = useLocalStorageSyncedState<string[]>(
        'seenEpisodes', 
        []
    );

   // Load from localStorage on mount
  useEffect(() => {
    const savedSeen = localStorage.getItem('seenEpisodes');
    
    if (savedSeen) setSeenEpisodes(JSON.parse(savedSeen));
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    localStorage.setItem('seenEpisodes', JSON.stringify(seenEpisodes));
  }, [ seenEpisodes]);



  const markAsSeen = (episodeId: string) => {
    setSeenEpisodes(prev => 
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    );
  };

    return {
        seenEpisodes,
        markAsSeen
    }

}

export { useEpisodeListPageSeenEpisodes };