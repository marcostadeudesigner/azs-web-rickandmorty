import { useQuery } from "@apollo/client";
import { GET_EPISODE } from "./EpisodeDetailPage.operations";


const useEpisodeDetailPageData = (id:string)=> {
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
  });

  return { loading, error, data };

}

export { useEpisodeDetailPageData };