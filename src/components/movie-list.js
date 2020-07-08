import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function MovieList(props){

    // On click local Function below passed through props 
    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }
    
// Return the list of movie from the map and onClick function.
    return (
        <div>
            { props.movies && props.movies.map( movie => {
                return (
                    <div key={movie.id} className="movie-item">
                        <h2 onClick={movieClicked(movie)}>{movie.title}</h2>  {/* Where i trigger onClick and pass  it through props on the local function */}
                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
                )
            })}
        </div>
    )
}


export default MovieList;     // Default means whenever we import Movie List to App js we won't use curly bracess