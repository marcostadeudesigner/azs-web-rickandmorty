import { useQuery, gql } from "@apollo/client";

const GET_FAVORITE_EPISODES = gql`
  query GetFavoriteEpisodes($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
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
`;

export { GET_FAVORITE_EPISODES };