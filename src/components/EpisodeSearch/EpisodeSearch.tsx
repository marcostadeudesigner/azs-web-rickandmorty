import Link from "next/link";
import { Episode } from "./EpisodeSerach.types";
import {useEpisodeSearchData} from "./useEpisodeSearchData";
import { useEpisodeListPageSeenEpisodes } from "../SeenEpisodes/useEpisodeListPageSeenEpisodes";
import { useEpisodeSearch } from "./useEpisodeSearch";

const EpisodeSearch = ({ setIsModalOpen }: { setIsModalOpen: (open: boolean) => void }) => {

    const { searchQuery, setSearchQuery, data, error, loading } = useEpisodeSearchData();
    const { markAsSeen } = useEpisodeListPageSeenEpisodes();
    const { inputRef } = useEpisodeSearch();
    return (
        <div className="relative m-6 h-full">
        <input
            ref={inputRef}
            type="text"
            placeholder="Search episodes..."
            className="px-4 py-2 w-full  text-[12px] rounded-lg border border-teal-200 text-white "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />

      
        {searchQuery.length >= 3 && (
            <div className=" top-full left-0 right-0 max-h-[30vh] text-white h-full overflow-y-auto mt-2 rounded-lg shadow-lg ">
            {loading && !data && <p>Initial loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data?.episodes?.results && data.episodes.results.length > 0 ? (
                data.episodes.results.map((episode: Episode) => (
                    <Link
                    key={episode.id}
                    href={`/episodes/${encodeURIComponent(episode.id)}`}
                    >
                    <div
                        className="p-2 hover:bg-gray-100 hover:text-slate-950 cursor-pointer border-b border-gray-200"
                        onClick={() => { markAsSeen(episode.id); setIsModalOpen(false); }}
                    >
                        <div className="font-medium text-lg">{episode.name}</div>
                        <div className="text-sm text-gray-600">
                        {episode.episode} | {episode.air_date} | Characters {episode.characters.length}
                        </div>
                    </div>
                    </Link>
                ))
            ) : (
                !loading && <div className="p-2 text-gray-400">No episodes found.</div>
            )}
            </div>
        )}
        </div>
    );
};

export { EpisodeSearch };