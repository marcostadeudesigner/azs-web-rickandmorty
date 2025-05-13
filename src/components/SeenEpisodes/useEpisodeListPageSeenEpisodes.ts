import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SeenEpisodesStore } from './SeenEpisodes.types';

 const useSeenEpisodesStore = create<SeenEpisodesStore>()(
  persist(
    (set, get) => ({
      seenEpisodes: [],
      markAsSeen: (episodeId: string) => {
        set((state) => {
          if (state.seenEpisodes.includes(episodeId)) {
            return {
              seenEpisodes: state.seenEpisodes.filter(id => id !== episodeId)
            };
          }
          return {
            seenEpisodes: [...state.seenEpisodes, episodeId]
          };
        });
      },
    }),
    {
      name: 'seen-episodes-storage', // key in localStorage
    }
  )
);

 const useEpisodeListPageSeenEpisodes = () => {
  const seenEpisodes = useSeenEpisodesStore((state) => state.seenEpisodes);
  const markAsSeen = useSeenEpisodesStore((state) => state.markAsSeen);

  return {
    seenEpisodes,
    markAsSeen,
  };
};

export { useEpisodeListPageSeenEpisodes };