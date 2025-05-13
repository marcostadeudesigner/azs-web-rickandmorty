import { useQuery } from "@apollo/client";
import { GET_EPISODE } from "./EpisodeDetailPage.operations";


const useEpisodeDetailPageData = (id:string)=> {
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id },
  });

  const Totalcharacters = data?.episode?.characters.length || 0;

  return {
    loading,
    error,
    data,
    Totalcharacters
  };

}

export { useEpisodeDetailPageData };