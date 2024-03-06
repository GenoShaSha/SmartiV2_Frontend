import { SearchOutlined } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";
import React from "react";

interface SearchProps {
  placeHolderText: string;
  inputChanged: (searchTerm: string) => void;
  setSearchInput: Function;
}
const Search = (props: SearchProps) => {
  const { placeHolderText, inputChanged, setSearchInput } = props;
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  React.useEffect(
    () => {
      inputChanged(debouncedSearchTerm);
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  //
  const SearchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchInput(e.target.value);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", border: "1px solid lightgray", paddingX: "0.5rem", borderRadius: "0.2rem", maxWidth: "12rem", color: "gray" }}>
      <SearchOutlined />
      <InputBase onChange={(e: React.ChangeEvent<HTMLInputElement>) => SearchInputChanged(e)} placeholder={placeHolderText} sx={{ border: "none" }} />
    </Box>
  );
};

export default Search;

// Hook
function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
