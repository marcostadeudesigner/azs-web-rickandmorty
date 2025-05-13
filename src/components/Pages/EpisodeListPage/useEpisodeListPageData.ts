
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_PAGINATED_EPISODES } from "./EpisodeListPage.operations";
import { Episodes, Info } from "./EpisodeListPage.types";
function useEpisodeListPageData() {
    const { loading, error, data, fetchMore } = useQuery(GET_PAGINATED_EPISODES, {
        variables: { page: 1 },
        notifyOnNetworkStatusChange: true,
    });
  const info:Info = data?.episodes?.info;

  const episodes:Episodes['results'] = data?.episodes?.results;
  
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMoreEpisodes = () => {
    if (info?.next) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          page: info?.next,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setIsFetchingMore(false);
          if (!fetchMoreResult) return prev;
          return {
            episodes: {
              ...fetchMoreResult.episodes,
              results: [
                ...prev.episodes.results,
                ...fetchMoreResult.episodes.results,
              ],
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 500 && !isFetchingMore) {
        loadMoreEpisodes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, isFetchingMore]);

  return {
    data,
    loading,
    error,
    info,
    episodes,
    isFetchingMore
  };
}
export { useEpisodeListPageData };