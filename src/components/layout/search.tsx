"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { redirect, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    // Perform search logic with the searchQuery value
    console.log("Search query:", searchQuery);
  };
let path
  if(searchQuery==null){
    path='#'
  }
  else{
    path=searchQuery
  }
  function removeSpaces(inputString:string) {
    // Use trim to remove leading and trailing spaces, and then replace inner spaces
    var stringWithoutSpaces = inputString.trim().replace(/\s/g, "");

    return stringWithoutSpaces;
  }
  path=removeSpaces(path)
  return (
    <div className="absolute top-24 xl:top-2 lg:top-2 z-50 xl:right-10 lg:right-10 right-5 flex">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="px-4 py-1 border border-slate-900 rounded-l-xl shadow-md focus:outline-none focus:ring-none text-gray-400 bg-slate-800"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
      <Link
        href={`/search/${path}`}
        className="text-lg bg-black text-gray-200 py-2 px-2 rounded-r-xl"
      >
        <FaSearch />
      </Link>
    </div>
  );
};

export default SearchComponent;
