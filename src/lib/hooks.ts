import { useEffect, useState } from "react";
import { API_BASE_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (searchText: string) => {
      if (!searchText) return;

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/?search=${searchText}`);

        if (!response.ok) throw new Error("Unable to fetch from server.");

        const data = await response.json();
        setJobItems(data.jobItems);
      } catch (error: Error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(searchText);
  }, [searchText]);

  return { jobItems, isLoading };
}
