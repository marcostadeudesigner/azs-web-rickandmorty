import { useQuery } from "@apollo/client";
import { GET_FAVORITE_EPISODES } from "./FavoritesPage.operations";
import { useEpisodeListPageFavorites } from '../../Favorite/useEpisodeListPageFavorites';

const useFavoritesPageData = ()=>{

    const { favorites } = useEpisodeListPageFavorites();
    const favoriteIds = favorites;
    const { loading, error, data } = useQuery(GET_FAVORITE_EPISODES, {
        variables: { ids: favoriteIds },
        skip: favoriteIds.length === 0,
     });


    return{
        loading,
        error,
        data
    }

}

export { useFavoritesPageData };