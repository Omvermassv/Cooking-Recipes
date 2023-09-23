import React from "react";
import useGlobalContex from '../Context';
import { useState } from "react";

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const { setSearchTerm, fetchRandomMeals } = useGlobalContex();

    function handleChange(event) {
        setSearchValue(event.target.value);

        // continuos search no need to press the search button but to much api request
        // setSearchTerm(event.target.value);
    }

    function handeleSubmit(event) {
        event.preventDefault();
        setSearchTerm(searchValue);
    }

    function handelRandomMeal() {

        // If you just remove this part instead using another useEffect (in Context.jsx) for page load then
        // if user searches for dal and then random and then again dal then search won't work
        setSearchTerm('');

        setSearchValue('');
        fetchRandomMeals();
    }

    return (
        <header className="search-container">
            <form onSubmit={handeleSubmit}>
                <input
                    type='text'
                    placeholder='Search your favourite meal'
                    value={searchValue}
                    className='search-input'
                    onChange={handleChange}
                />
                <button
                    type='submit'
                    className='btn'>
                    Search
                </button>
                <button
                    type='button'
                    className='btn btn-hipster'
                    onClick={handelRandomMeal}>
                    Surprise me!
                </button>
            </form>
        </header>
    );
}

export default Search;