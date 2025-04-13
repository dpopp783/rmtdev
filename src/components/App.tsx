import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { useState } from "react";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  // derived state
  const resultsCount = jobItems?.length || 0;

  const maxPage = Math.ceil(resultsCount / 7);

  const jobItemsSliced =
    jobItems?.slice(
      (currentPage - 1) * RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];

  // event handlers / actions
  const handleChangePage = (direction: "next" | "back") => {
    if (direction === "next") {
      setCurrentPage((prev) => Math.min(maxPage, prev + 1));
    } else if (direction === "back") {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <>
      <Background></Background>
      <Header>
        <HeaderTop>
          <Logo></Logo>
          <BookmarksButton></BookmarksButton>
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount resultsCount={resultsCount} />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
