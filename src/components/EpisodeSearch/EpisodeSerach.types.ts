type Episode = {
  id: string
  name: string;
  episode: string;
  air_date: string;
  characters: {
    id: string;
    name: string;
    image: string;
  }[];
}

export type { Episode };