import { FaRegStar, FaStar } from "react-icons/fa";
import { Episode } from "../Pages/EpisodeListPage/EpisodeListPage.types";
import { useEpisodeListPageFavorites } from "./useEpisodeListPageFavorites";

const Favorite = ({ episode }: { episode: Episode }) => {

    const { favorites, toggleFavorite } = useEpisodeListPageFavorites();

    const isFavorite = favorites.includes(episode.id);

    return (
        <button
        onClick={(e) => {
        e.preventDefault();
        toggleFavorite(episode.id);
        }}
        className="absolute top-2 right-2 p-2 cursor-pointer hover:text-yellow-500"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
        </button>
    )
}

export { Favorite };