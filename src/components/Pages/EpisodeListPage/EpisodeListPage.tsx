"use client";
import Link from 'next/link';
import { Episode } from "./EpisodeListPage.types";
import { useEpisodeListPageData } from "./useEpisodeListPageData";
import { useEpisodeListPageSeenEpisodes } from "../../SeenEpisodes/useEpisodeListPageSeenEpisodes";
import { Loading } from '../../Loading/Loading';
import { Favorite } from '../../Favorite';
import { SeenEpisodes } from '../../SeenEpisodes/SeenEpisodes';
import { AvatarGroup } from '../../AvatarGroup';

const EpisodeListPage = () => {

  const { markAsSeen } = useEpisodeListPageSeenEpisodes();

  const {data, episodes, error, isFetchingMore, loading } = useEpisodeListPageData();

  if (loading && !data) return <p>Initial loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  const episodesList = episodes.map((episode:Episode) =>
    { 
      let numberOfCharactersByEpisode = episode.characters.length;
      return (
        <div 
        key={episode.id}
        className="relative border border-teal-200 rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow"
        >
            <Favorite episode={episode} />
            <SeenEpisodes episode={episode} />
          

          <Link
          key={episode.id}
          href={`/episodes/${encodeURIComponent(episode.id)}`}
          className=" rounded-lg shadow-md p-2 hover:shadow-lg transition-shadow"
          >
            <div onClick={() => {
            markAsSeen(episode.id);
            }} key={episode.id}
            className=" rounded-lg shadow-md p-2"
            >
              <h3 className="text-lg font-bold mb-2">{episode.name}</h3>
              <p className="text-gray-400 mb-2">
                Episode: {episode.episode}
              </p>
              <p className="text-gray-400 mb-2">
                Air Date: {episode.air_date}
              </p>
              <p className="text-gray-400 mb-2">
                Characters: {numberOfCharactersByEpisode}
              </p>
              <AvatarGroup
                characters={episode.characters}
              />
            </div>
          </Link>
        </div>
      )
    }
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Episodes</h1>
      </div>
      <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {episodesList}
      </div>

      {(loading || isFetchingMore) && (
      <Loading />
      )}
      </div>
    </>
  );
}

export { EpisodeListPage };