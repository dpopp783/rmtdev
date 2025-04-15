import { useContext } from "react";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      `useBookmarksContext cannot be used outside a BookmarksContextProvider`
    );
  }

  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      `useActiveIdContext cannot be used outside a ActiveIdContextProvider`
    );
  }

  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error(
      `useSearchTextContext cannot be used outside a SearchTextContextProvider`
    );
  }

  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      `useJobItemsContext cannot be used outside a JobItemsContextProvider`
    );
  }

  return context;
}
