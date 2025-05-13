type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: { 
    id: string,
    image: string; 
  }[];
};

type Info = {
  count: number;  
  pages: number;
  next: number | null;
  prev: number | null;
};

type Episodes = {
  info: Info;
  results: Episode[];
};

export type { Episode, Info, Episodes };