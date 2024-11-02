"use client";

import { useState } from "react";

const SearchArticleInput = () => {
  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ searchText });
  };
  return (
    <div>
      <form
        className="my-5 w-full md:w-2/3 m-auto"
        onSubmit={formSubmitHandler}
      >
        <input
          className="w-full p-3 rounded text-xl border-none text-gray-900"
          type="search"
          placeholder="Search for article"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchArticleInput;
