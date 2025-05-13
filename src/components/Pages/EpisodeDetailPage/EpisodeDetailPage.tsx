"use client";
import { notFound } from 'next/navigation';
import { useEpisodeDetailPageData } from './useEpisodeDetailPageData';


const EpisodeDetailPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
    
  const { loading, error, data, Totalcharacters } = useEpisodeDetailPageData(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading episode.</p>;
  if (!data?.episode) return notFound();

  return (
    <div className=" w-full rounded-lg shadow-md p-2 mb-2">
      <h1 className="text-3xl font-bold mb-4">{data.episode.name}</h1>
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Episode:</span> {data.episode.episode}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Air Date:</span> {data.episode.air_date}
        </p>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Characters { Totalcharacters }</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {data.episode.characters.map((character: any) => (
          <div key={character.id} className="flex border gap-4 flex-wrap border-teal-200 rounded-lg p-4">
            <div className='w-full flex justify-center items-center'>
                <img
                src={character.image}
                alt={character.name}
                className=" h-32 object-cover rounded-lg mb-2"
              />
            </div>
            <div>
              <h3 className="font-semibold">{character.name}</h3>
              <p className="text-sm text-gray-600">{character.species}</p>
              <p className="text-sm" style={{ color: 
                character.status === 'Alive' ? 'green' :
                character.status === 'Dead' ? 'red' : 'gray'
              }}>
                {character.status}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export { EpisodeDetailPage };