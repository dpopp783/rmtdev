import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationDirection } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: PaginationDirection) => void;
  currentPage: number;
  maxPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  maxPage,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="back"
          currentPage={currentPage}
          onClick={onClick}
        />
      )}
      {currentPage < maxPage && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={onClick}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PaginationDirection;
  currentPage: number;
  onClick: (direction: PaginationDirection) => void;
};
function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(event) => {
        onClick(direction);
        event.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "back" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
