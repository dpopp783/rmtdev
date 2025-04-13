import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants";
import { JobItem, JobItemFull } from "./types";

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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  const resultsCount = jobItems.length;

  useEffect(() => {
    const fetchData = async (searchText: string) => {
      if (!searchText) return;

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/?search=${searchText}`);

        if (!response.ok) throw new Error("Unable to fetch from server.");

        const data = await response.json();
        setJobItems(data.jobItems);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(searchText);
  }, [searchText]);

  return { jobItemsSliced, isLoading, resultsCount } as const;
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async (id: number) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Unable to fetch job ${id} from server`);
        }
        const data = await response.json();
        console.log(data);
        setJobItem(data.jobItem);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(`Error: ${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  return { jobItem, isLoading } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
