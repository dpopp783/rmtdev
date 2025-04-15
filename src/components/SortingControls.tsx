import { useJobItemsContext } from "../lib/context_hooks";
import { SortByOption, sortByOptionsArr } from "../lib/types";

export default function SortingControls() {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      {sortByOptionsArr.map((sortBy) => (
        <SortingButton key={sortBy} sortBy={sortBy} />
      ))}
    </section>
  );
}

type SortingButtonProps = {
  sortBy: SortByOption;
};

function SortingButton({ sortBy }: SortingButtonProps) {
  const { handleChangeSortBy, sortBy: activeSortBy } = useJobItemsContext();
  return (
    <button
      onClick={() => handleChangeSortBy(sortBy)}
      className={`sorting__button sorting__button--${sortBy} ${
        activeSortBy == sortBy ? "sorting__button--active" : ""
      }`}
    >
      {sortBy}
    </button>
  );
}
