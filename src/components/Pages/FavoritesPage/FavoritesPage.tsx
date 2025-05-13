"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useFavoritesPageData } from "./useFavoritesPageData";



const FavoritesPage = ()=> {

  const { data, loading, error } = useFavoritesPageData();
 

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const favoriteEpisodes = data?.episodesByIds || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaStar className="text-yellow-500" /> Favorite Episodes
      </h1>
      
      {favoriteEpisodes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No favorite episodes yet!</p>
          <Link
            href="/episodes"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Browse Episodes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteEpisodes.map((episode: any) => (
            <div
              key={episode.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow relative"
            >
              <Link href={`/episodes/${encodeURIComponent(episode.id)}`}>
                <div className="pt-8">
                  <h3 className="text-lg font-bold mb-2">{episode.name}</h3>
                  <p className="text-gray-600 mb-2">
                    Characters: {episode.characters.length}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Epsode: {episode.episode}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Air Date: {episode.air_date}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {episode.characters.slice(0, 5).map((character: any) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export { FavoritesPage };