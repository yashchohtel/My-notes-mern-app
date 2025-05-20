import { useState } from "react";

const useSearch = () => {

    // state to store search Query
    const [searchQuery, setSearchQuery] = useState("");

    // return all actions
    return {
        searchQuery,
        setSearchQuery
    }

}

export default useSearch;