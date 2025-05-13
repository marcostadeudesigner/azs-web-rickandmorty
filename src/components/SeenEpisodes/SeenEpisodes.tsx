import { FaEye, FaRegEye } from "react-icons/fa";
import { Episode } from "../Pages/EpisodeListPage/EpisodeListPage.types";
import { useEpisodeListPageSeenEpisodes } from "./useEpisodeListPageSeenEpisodes";

const SeenEpisodes = ({ episode }: { episode: Episode }) => {
    const { seenEpisodes, markAsSeen } = useEpisodeListPageSeenEpisodes();

    const isSeen = seenEpisodes.includes(episode.id);

    return (
        <button
        onClick={(e) => {
        e.preventDefault();
        markAsSeen(episode.id);
        }}
        className="absolute top-2 left-2 p-2 hover:text-blue-500"
        aria-label={isSeen ? "Mark as unseen" : "Mark as seen"}
        >
          {isSeen ? <FaEye className="text-blue-500" /> : <FaRegEye />}
        </button>
    )
}

export { SeenEpisodes };