import React, { useState, useEffect } from 'react';  // useState and useEffect are called for hook. to fetch data from the API
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);


  // We fetch the data from the API using "GET" method.
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      Headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 3cfc1ea4c5634ff3b0211151ed7825ba7bfbf50b',
      }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))

  }, [])

const loadmovie = movie => {
  setSelectedMovie(movie);
  setEditedMovie(null);
}

const editClicked = movie => {
  setEditedMovie(movie);
  setSelectedMovie(null);
}

const updatedMovie = movie => {
  const newMovies = movies.map( mov => {
    if (mov.id === movie.id) {
      return movie
    }
    return mov;
  })
  setMovies(newMovies)
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
          <MovieList movies={movies} movieClicked={loadmovie} editClicked={editClicked} />           {/* This is where we pass the props from components where the MovieList function is */}
          <MovieDetails movie={selectedMovie} updateMovie={loadmovie}/>  
          { editedMovie ? <MovieForm movie={editedMovie}/>  : null}
        </div> 
    </div>
  );
}

export default App;
