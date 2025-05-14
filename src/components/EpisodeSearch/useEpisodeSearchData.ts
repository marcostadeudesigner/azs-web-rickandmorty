import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_EPISODES } from "./EpisodeSearch.operations";

const useEpisodeSearchData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, error, loading } = useQuery(GET_EPISODES, {
    variables: { name: searchQuery },
    skip: searchQuery.length < 3
  });
    return {
    searchQuery,
    setSearchQuery,
    data,
    error,
    loading
    }
}

export { useEpisodeSearchData };
