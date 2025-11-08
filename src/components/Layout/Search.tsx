import { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import {
  searchAnime,
  setSearchQuery,
  clearSearchResults,
} from '../../store/animeSlice';

interface SearchProps {
  initialValue?: string;
}

const Search = ({ initialValue = '' }: SearchProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(initialValue);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Clear search input when navigating to detail page
  useEffect(() => {
    if (location.pathname.startsWith('/anime/')) {
      setInputValue('');
      dispatch(setSearchQuery(''));
      dispatch(clearSearchResults());
    }
  }, [location.pathname, dispatch]);

  // Debounced search with API call cancellation
  const debouncedSearch = useCallback(
    (query: string, page: number = 1) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        if (query.trim()) {
          dispatch(setSearchQuery(query));
          dispatch(searchAnime({ query, page }));
        } else {
          dispatch(setSearchQuery(''));
          dispatch(clearSearchResults());
        }
      }, 250);

      setDebounceTimeout(timeout);
    },
    [dispatch, debounceTimeout]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // If on detail page and user starts typing, navigate back to homepage
    if (location.pathname.startsWith('/anime/') && value.trim()) {
      navigate('/');
    }

    debouncedSearch(value, 1);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for anime..."
        className="border-muted/30 bg-foreground/10 text-foreground placeholder:text-foreground/50 focus:border-primary w-full rounded-lg border-2 px-4 py-2 pr-10 focus:outline-none"
      />
      <FiSearch className="text-foreground/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg" />
    </div>
  );
};

export default Search;
