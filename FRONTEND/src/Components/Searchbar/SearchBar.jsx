import React from 'react'
import "./SearchBar.css";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { filterNote } from '../../features/notes/notesSlice';

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  // initilize use dispatch 
  const dispatch = useDispatch();

  // function to re start search note feature
  const reStartSearch = (filterType, filterActive, whereAction = "searchBar") => {
    dispatch(filterNote({ filterType, filterActive, whereAction}))
  }

  return (
    <>

      <div className="searchBar">
        <input
          className="search_input"
          type="text"
          placeholder="Search your notes..."
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