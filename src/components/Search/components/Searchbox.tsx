import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { connectSearchBox } from "react-instantsearch-dom";
import type { SearchBoxProvided } from "react-instantsearch-core";
export const Searchbox = ({ refine }: SearchBoxProvided) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    refine(debounceSearchTerm);
  }, [debounceSearchTerm, refine]);
  return (
    <form noValidate role="search">
      <input onChange={(e) => setSearchTerm(e.target.value)} />
    </form>
  );
};

export const CustomSearchBox = connectSearchBox(Searchbox);
