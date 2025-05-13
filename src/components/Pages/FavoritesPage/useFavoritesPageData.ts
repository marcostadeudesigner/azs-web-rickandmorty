import { useLocalStorageSyncedState } from "@/src/hooks/useLocalStorage";
import { useQuery } from "@apollo/client";
import { GET_FAVORITE_EPISODES } from "./FavoritesPage.operations";


const useFavoritesPageData = ()=>{
    const [favoriteIds] = useLocalStorageSyncedState<string[]>('favorites', []);

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