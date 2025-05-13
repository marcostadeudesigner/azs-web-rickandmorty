import { AvatarGroupProps } from "./AvatarGroup.types";

const AvatarGroup = ({ characters }: AvatarGroupProps) => (
  <div className="flex flex-wrap -space-x-5 items-center gap-2">
    {characters.slice(0, 6).map((character) => (
      <img
        key={character.id}
        src={character.image}
        alt="Character"
        className="w-10 h-10 rounded-full border-2 border-gray-20"
      />
    ))}
    {characters.length > 5 && (
      <span>+ {characters.length - 6} more</span>
    )}
  </div>
);

export { AvatarGroup };