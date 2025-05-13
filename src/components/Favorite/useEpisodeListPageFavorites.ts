import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoritesStore } from './Favorite.types';

const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (episodeId: string) => {
        set((state) => {
          if (state.favorites.includes(episodeId)) {
            return {
              favorites: state.favorites.filter(id => id !== episodeId)
            };
          }
          return {
            favorites: [...state.favorites, episodeId]
          };
        });
      },
    }),
    {
      name: 'favorites-storage', 
    }
  )
);


const useEpisodeListPageFavorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return {
    favorites,
    toggleFavorite
  };
};

export { useEpisodeListPageFavorites };