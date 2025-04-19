import React from 'react'
import "./SearchBar.css";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {

  return (
    <>

      <div className="searchBar">
        <input type="text" placeholder="Search your notes..." className="search_input" />
        <span> <IoSearchSharp /> </span>
      </div>
    </>

  )

}

export default SearchBar