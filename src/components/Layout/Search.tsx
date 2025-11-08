import { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
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
  const [inputValue, setInputValue] = useState(initialValue);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

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
    <div className="relative mx-auto mb-8 max-w-2xl">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for anime..."
        className="border-muted focus:outline-primary w-full rounded-xl border-2 px-4 py-3 pr-12 text-lg focus:border-transparent focus:outline-2"
      />
      <FiSearch className="text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xl" />
    </div>
  );
};

export default Search;
