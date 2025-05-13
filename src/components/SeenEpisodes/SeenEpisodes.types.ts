type SeenEpisodesStore = {
  seenEpisodes: string[];
  markAsSeen: (episodeId: string) => void;
};
export type { SeenEpisodesStore };