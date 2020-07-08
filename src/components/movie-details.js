import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


// This function is to show movie details
function MovieDetails(props){

    const [ highlighted, setHighlighed] = useState(-1);

    // I assign the 'props.movie' to the variable 'mov' to avoid repeating it everywhere
    let mov = props.movie;  

    // Function to highligh the stars when mouse is moving on the stars.
    const highlightRate = high => evt => {
        setHighlighed(high);
    }

    
    // Function to click on stars when for rating
    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 3cfc1ea4c5634ff3b0211151ed7825ba7bfbf50b',
            },
            body: JSON.stringify( {stars: rate + 1} )
        })
        .then( resp => getDetails())
        .catch( error => console.log(error))       
    }
    
    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 3cfc1ea4c5634ff3b0211151ed7825ba7bfbf50b',
            },
        })
        .then( resp => resp.json())
        .then( resp => console.log(resp))
        .catch( error => console.log(error)) 
    }


    return (
        <React.Fragment>
            { mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange':''}/>
                    ({mov.no_of_ratings})
                    <div className='rate-container'>
                        <h2>Rate it</h2>
                        { [...Array(5)].map( (e, i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1 ? 'purple' : ''}
                                    onMouseEnter={highlightRate(i)}
                                    onMouseLeave={highlightRate(-1)}
                                    onClick={rateClicked(i)}
                                    />
                                    
                        })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}


export default MovieDetails;     // Default means whenever we import Movie Details to App js we won't use curly bracess