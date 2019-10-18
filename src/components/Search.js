import React, {useState} from 'react';

const Search = (props) => {
    const [searchVal, setSearchVal] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchVal(e.target.value);
    }

    const resetInputField = () => {
        setSearchVal("");
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchVal);
        resetInputField();
    }

    return (
        <form className="search">
            <input
                value={searchVal}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input 
                onClick={callSearchFunction}
                type="submit"
                value="ARA"
            />
        </form>
    );
};

export default Search;