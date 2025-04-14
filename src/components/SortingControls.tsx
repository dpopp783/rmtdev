import { SortByOptions, sortByOptionsArr } from "../lib/types";

type SortingControlsProps = {
  onClick: (newSortBy: SortByOptions) => void;
  activeSortBy: SortByOptions;
};

export default function SortingControls({
  onClick,
  activeSortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      {sortByOptionsArr.map((sortBy) => (
        <SortingButton
          key={sortBy}
          onClick={onClick}
          sortBy={sortBy}
          activeSortBy={activeSortBy}
        />
      ))}
    </section>
  );
}

type SortingButtonProps = SortingControlsProps & {
  sortBy: SortByOptions;
};

function SortingButton({ onClick, sortBy, activeSortBy }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(sortBy)}
      className={`sorting__button sorting__button--${sortBy} ${
        activeSortBy == sortBy ? "sorting__button--active" : ""
      }`}
    >
      {sortBy}
    </button>
  );
}
