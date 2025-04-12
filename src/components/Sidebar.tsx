import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop() {
  return (
    <div className="sidebar__top">
      <ResultsCount />
      <SortingControls />
    </div>
  );
}
