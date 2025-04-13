import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants";
import { JobItem, JobItemFull } from "./types";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemFull;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.description}`);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => {
      return id ? fetchJobItem(id) : null;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => handleError(error),
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading };
}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.description}`);
  }
  const data = await response.json();
  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => {
      return searchText ? fetchJobItems(searchText) : null;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => handleError(error),
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading };
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}
