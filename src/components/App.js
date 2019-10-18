import React, {useState, useEffect, useReducer} from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; 

const initialState = {
    loading: true,
    movies: [],
    errorMes: null
};

const reducer = (state, action) => {
    switch(action.type){
        case "SEARCH_MOVIES_REQ": 
            return {
                ...state,
                loading: true,
                errorMes: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAIL":
            return {
                ...state,
                loading: false,
                errorMes: action.error
            };
        default: 
            return state;

    }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    fetch(MOVIE_API)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchVal => {
    dispatch({
        type: "SEARCH_MOVIES_REQ"
    });

    fetch(`https://www.omdbapi.com/?s=${searchVal}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response == "True"){
          dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search

          });
        } else {
          dispatch({
              type: "SEARCH_MOVIES_FAIL",
              error: jsonResponse.Error
          });
        };
      });
  };

  const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text="MEARCH" />
      <Search search={search} />
      <p className="App-intro">İşte sana bir kaç öneri</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Lütfen Bekleyin...</span>
        ): errorMessage ? (
          <div className ="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie, index)=>(
            <Movie key={`${index}-{movie.Title}`} movie={movie} />
          ))
        )}

      </div>
    </div>
  );
  
};

export default App;
