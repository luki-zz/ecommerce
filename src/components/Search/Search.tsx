import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  PoweredBy,
} from "react-instantsearch-dom";
import { CustomSearchBox } from "./components/Searchbox";
import { CustomHits } from "./components/CustomHits";

const searchClient = algoliasearch(
  "1M78V178BQ",
  "5feb242385981cfd7c0ddddd1d96a61f"
);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="my_first_index">
      <CustomSearchBox />
      <CustomHits />
      <PoweredBy />
    </InstantSearch>
  );
};
