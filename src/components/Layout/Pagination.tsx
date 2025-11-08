import { useAppDispatch } from '../../store/hooks';
import { searchAnime } from '../../store/animeSlice';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  searchQuery: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  searchQuery,
}: PaginationProps) => {
  const dispatch = useAppDispatch();

  const handlePageChange = (newPage: number) => {
    if (searchQuery.trim()) {
      dispatch(searchAnime({ query: searchQuery, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8 flex w-full items-center justify-between gap-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-card text-foreground hover:bg-primary disabled:hover:bg-card disabled:hover:text-foreground hover:text-foreground flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiChevronLeft className="text-xl" />
        <span className="hidden md:block">Previous</span>
      </button>

      <span className="text-foreground font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="bg-card text-foreground hover:bg-primary disabled:hover:bg-card disabled:hover:text-foreground hover:text-foreground flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 transition-all disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="hidden md:block">Next</span>
        <FiChevronRight className="text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
