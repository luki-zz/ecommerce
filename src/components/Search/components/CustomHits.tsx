import React from "react";
import type { StateResultsProvided } from "react-instantsearch-core";
import { connectStateResults } from "react-instantsearch-dom";

export const Hits = ({
  allSearchResults,
  searchResults,
}: StateResultsProvided) => {
  if (searchResults?.query === "" || searchResults === undefined) return <></>;

  return (
    <ul>
      {allSearchResults?.hits.map((product) => (
        <li key={product.objectID}>{product.name}</li>
      ))}
      ;
    </ul>
  );
};

export const CustomHits = connectStateResults(Hits);
