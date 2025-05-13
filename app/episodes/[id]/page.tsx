"use client";

import { use } from 'react'; // Import React's use hook
import  {makeClient}  from '@/src/lib/apollo/client';
import { gql, useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export default function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise using React.use()
  const { id } = use(params);

    const { loading, error, data } = useQuery(GET_EPISODE, {
      variables: { id: id },
    });

    console.log('data', data);
  if (loading) return <p>Loading...</p>;

  if (!data?.episode) return notFound();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold mb-4">{data.episode.name}</h1>
      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Episode:</span> {data.episode.episode}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Air Date:</span> {data.episode.air_date}
        </p>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Characters</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.episode.characters.map((character: any) => (
          <div key={character.id} className="bg-gray-50 rounded-lg p-4">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold">{character.name}</h3>
            <p className="text-sm text-gray-600">{character.species}</p>
            <p className="text-sm" style={{ color: 
              character.status === 'Alive' ? 'green' :
              character.status === 'Dead' ? 'red' : 'gray'
            }}>
              {character.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}