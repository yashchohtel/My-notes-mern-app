import React from 'react'
import "./SearchBar.css";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { filterNote } from '../../features/notes/notesSlice';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  // initilize use dispatch 
  const dispatch = useDispatch();

  // configure useLocation
  const location = useLocation();

  // setting page locations
  const isAdmin = location.pathname === "/admin-page";

  // function to re start search note feature
  const reStartSearch = (filterType, filterActive, whereAction = "searchBar") => {
    dispatch(filterNote({ filterType, filterActive, whereAction }))
  }

  return (
    <>

      <div className="searchBar" onClick={(e) => e.stopPropagation()}>
        <input
          className="search_input"
          type="text"
          placeholder={isAdmin ? "Search user by name, userid, email..." : "Search your notes..."}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            reStartSearch("allNotes", false);
          }}
        />
        <span> <IoSearchSharp /> </span>
      </div>
    </>

  )

}

export default SearchBar