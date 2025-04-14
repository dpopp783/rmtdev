import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    handleToggleBookmark(id);
  };

  return (
    <button onClick={onClick} className="bookmark-btn">
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
