import { useJobItemsContext } from "../lib/context_hooks";
import JobList from "./JobList";

export default function SearchResults() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
