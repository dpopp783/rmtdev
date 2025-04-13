type ResultsCountProps = {
  resultsCount: number;
};

export default function ResultsCount({ resultsCount }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{resultsCount}</span> results
    </p>
  );
}
