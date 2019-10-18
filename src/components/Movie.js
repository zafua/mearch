import React from 'react';

const DEFAULT_PLACEHOLDER = 
"https://turkcealtyazi.org/images/no-image-200.jpg";

const Movie = ({movie}) => {
    const poster = 
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER : movie.Poster;
    
    return (
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img
                    width="200"
                    alt={movie.Title}
                    src={poster}
                />
            </div>
            <p>({movie.Year})</p>
        </div>
    );
}; 

export default Movie;