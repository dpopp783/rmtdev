import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants";
import { JobItem } from "./types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

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

  return [jobItemsSliced, isLoading] as const;
}
