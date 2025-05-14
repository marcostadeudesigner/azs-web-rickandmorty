import { gql } from '@apollo/client';

const GET_EPISODES = gql`
  query GetEpisodes($name: String!) {
    episodes(filter: { name: $name }) {
      results {
        id
        name
        episode
        air_date
        characters {
          id
          name
          image
        }
      }
    }
  }
`;
export { GET_EPISODES };