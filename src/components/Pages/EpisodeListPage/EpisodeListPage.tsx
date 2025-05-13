"use client";
import Link from 'next/link';
import {  FaStar } from 'react-icons/fa';
import { Episode } from "./EpisodeListPage.types";
import { useEpisodeListPageData } from "./useEpisodeListPageData";
import { useEpisodeListPageSeenEpisodes } from "../../SeenEpisodes/useEpisodeListPageSeenEpisodes";
import { Loading } from '../../Loading/Loading';
import { Favorite } from '../../Favorite';
import { SeenEpisodes } from '../../SeenEpisodes/SeenEpisodes';

const EpisodeListPage = () => {

  const { markAsSeen } = useEpisodeListPageSeenEpisodes();

  const {data, episodes, error, isFetchingMore, loading } = useEpisodeListPageData();

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
           
            let numberOfCharactersByEpisode = episode.characters.length;
            
            return (
              <div 
                key={episode.id}
                className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <Favorite episode={episode} />
                <SeenEpisodes episode={episode} />

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
          <Loading />
        )}
      </div>
    </>
  );
}

export { EpisodeListPage };