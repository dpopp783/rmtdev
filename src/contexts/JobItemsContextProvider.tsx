import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortByOption, PaginationDirection, JobItem } from "../lib/types";
import { useSearchTextContext } from "../lib/context_hooks";

type TJobItemsContext = {
  jobItems: JobItem[];
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  resultsCount: number;
  maxPage: number;
  currentPage: number;
  sortBy: SortByOption;
  handleChangePage: (direction: PaginationDirection) => void;
  handleChangeSortBy: (newSortBy: SortByOption) => void;
};
export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByOption>("relevant");

  // derived state
  const resultsCount = jobItems?.length || 0;

  const maxPage = Math.ceil(resultsCount / 7);

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy == "recent") {
          return a.daysAgo - b.daysAgo;
        } else {
          throw new Error(
            `Invalid state: sorting is not implemented for sorting key ${sortBy}`
          );
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  // event handlers / actions
  const handleChangePage = useCallback((direction: PaginationDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "back") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortByOption) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  return (
    <JobItemsContext.Provider
      value={{
        jobItems: jobItems || [],
        jobItemsSortedAndSliced,
        isLoading,
        resultsCount,
        maxPage,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
