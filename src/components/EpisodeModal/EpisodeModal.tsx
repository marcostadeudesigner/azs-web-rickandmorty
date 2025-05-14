import Modal from 'react-modal';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Episode {
  name: string;
  episode: string;
  air_date: string;
  characters?: Character[];
}

interface EpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode?: Episode;
}

const EpisodeModal = ({ isOpen, onClose, episode }: EpisodeModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      {episode && (
        <div className="p-4 bg-white rounded-lg text-black max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{episode.name}</h2>
            <button 
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <p><strong>Episode Code:</strong> {episode.episode}</p>
            <p><strong>Air Date:</strong> {episode.air_date}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Characters in this episode:</h3>
              <div className="grid grid-cols-4 gap-2">
                {episode.characters?.map(character => (
                  <div key={character.id} className="text-center">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-16 h-16 rounded-full mx-auto mb-1"
                    />
                    <span className="text-sm">{character.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EpisodeModal;