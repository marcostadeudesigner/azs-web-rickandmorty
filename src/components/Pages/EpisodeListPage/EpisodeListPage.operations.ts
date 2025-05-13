import { gql } from "@apollo/client";

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

export { GET_PAGINATED_EPISODES };