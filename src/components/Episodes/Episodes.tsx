"use client";

import { useQuery, gql } from "@apollo/client";

type Episodes = {

      id: string;
      name: string;
    air_date: string;
    characters:{
        id:string;
        name:string;
        status:string;
        species:string;
        image:string  
      };
	created: string;
      

}
const GET_POSTS = gql`
   {
  episodes{
    results{
      id
      name
    air_date
    characters{
        id
        name
        status
        species
        image
      }
	created
      
    }
  }
}
`;

export default function Episodes() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* {data.episodes.map((episode:Episodes) => (
        <div key={episode.}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))} */}
      {data.episodes.results.map((episode: Episodes) => (
        <div key={episode.id} style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
          <h2>{episode.name}</h2>
          <p>{episode.air_date}</p>
          <p>{episode.created}</p>
          <img src={episode.characters.image} alt={episode.characters.name} />
        </div>
      ))}
    </div>
  );
}