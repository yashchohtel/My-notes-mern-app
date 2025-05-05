import React from 'react'
import "./SearchBar.css";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  return (
    <>

      <div className="searchBar">
        <input
          className="search_input"
          type="text"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span> <IoSearchSharp /> </span>
      </div>
    </>

  )

}

export default SearchBar