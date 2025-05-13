interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (episodeId: string) => void;
}
export type { FavoritesStore };