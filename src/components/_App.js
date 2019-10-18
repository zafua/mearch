import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; 

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMes, setErrorMes] = useState(null);

  useEffect(()=>{
    fetch(MOVIE_API)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      })
  }, []);

  const search = searchVal => {
    setLoading(true);
    setErrorMes(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response == "True"){
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMes(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="MEARCH" />
      
      <Search search={search} />
    </div>
  )
  
}

export default App;
