"use client";

import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { FaRegStar, FaStar, FaEye, FaRegEye } from 'react-icons/fa';
import { useLocalStorageSyncedState } from "@/src/hooks/useLocalStorage";

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

const GET_PAGINATED_EPISODES = gql`
query GetPaginatedEpisodes($page: Int!) {
  episodes(page: $page) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      episode
      air_date
      characters {
        id
        image
      }
    }
  }
}`;




function EpisodeListPage() {
  // Use the custom hook for state management
  const [favorites, setFavorites] = useLocalStorageSyncedState<string[]>(
    'favorites', 
    []
  );
  
  const [seenEpisodes, setSeenEpisodes] = useLocalStorageSyncedState<string[]>(
    'seenEpisodes', 
    []
  );
  const { loading, error, data, fetchMore } = useQuery(GET_PAGINATED_EPISODES, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const info:Info = data?.episodes?.info;
  const episodes:Episodes['results'] = data?.episodes?.results;

  

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMoreEpisodes = () => {
    if (info.next) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          page: info.next,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setIsFetchingMore(false);
          if (!fetchMoreResult) return prev;
          return {
            episodes: {
              ...fetchMoreResult.episodes,
              results: [
                ...prev.episodes.results,
                ...fetchMoreResult.episodes.results,
              ],
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 500 && !isFetchingMore) {
        loadMoreEpisodes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, isFetchingMore]);
    // Add these new states


  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedSeen = localStorage.getItem('seenEpisodes');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedSeen) setSeenEpisodes(JSON.parse(savedSeen));
  }, []);

  // Save to localStorage when states change
  useEffect(() => {

    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('seenEpisodes', JSON.stringify(seenEpisodes));
  }, [favorites, seenEpisodes]);

  const toggleFavorite = (episodeId: string) => {
    setFavorites(prev => 
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    );
  };

  const markAsSeen = (episodeId: string) => {
    setSeenEpisodes(prev => 
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    );
  };


  if (loading && !data) return <p>Initial loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold">All Episodes</h1>
    <Link
      href="/favorites"
      className="flex items-center gap-2 px-6 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200"
    >
      <FaStar /> View Favorites
    </Link>
  </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {episodes.map((episode:Episode) =>{ 
            const isFavorite = favorites.includes(episode.id);
            const isSeen = seenEpisodes.includes(episode.id);
            let numberOfCharactersByEpisode = episode.characters.length;
            
            return (
              <div 
                key={episode.id}
                className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(episode.id);
                  }}
                  className="absolute top-2 right-2 p-2 hover:text-yellow-500"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                </button>

                {/* Seen Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    markAsSeen(episode.id);
                  }}
                  className="absolute top-2 left-2 p-2 hover:text-blue-500"
                  aria-label={isSeen ? "Mark as unseen" : "Mark as seen"}
                >
                  {isSeen ? <FaEye className="text-blue-500" /> : <FaRegEye />}
                </button>
                <Link
    key={episode.id}
    href={`/episodes/${encodeURIComponent(episode.id)}`}
    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
  >
                <div onClick={() => {
                    markAsSeen(episode.id);
                  }} key={episode.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-bold mb-2">{episode.name}</h3>
                  <p className="text-gray-600 mb-2">
                    Characters: {numberOfCharactersByEpisode}
                    </p>
                  <p className="text-gray-600 mb-2">
                    Episode: {episode.episode}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Air Date: {episode.air_date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {episode.characters.slice(0, 5).map((character) => (
                      <img
                        key={character.id}
                        src={character.image}
                        alt="Character"
                        className="w-10 h-10 rounded-full"
                      />
                    ))}
                  </div>
                </div>
            </Link>
            </div>
          )})}
        </div>

        {(loading || isFetchingMore) && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default EpisodeListPage;