import { useJobItemsContext } from "../lib/context_hooks";

export default function ResultsCount() {
  const { resultsCount } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{resultsCount}</span> results
    </p>
  );
}
