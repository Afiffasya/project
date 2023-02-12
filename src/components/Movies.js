import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../style/Movies.css";

const PopularMovieList = ({ popularMovies }) => {
  const [selectedMovie, setSelectedMovie] = useState({});

  const handleShow = (movie) => {
    setSelectedMovie(movie);
  };

  return popularMovies.map((movie, i) => {
    return (
      <div
        className="flip-card"
        key={movie.id}
        onMouseEnter={() => handleShow(movie)}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card className="movie-card" key={i}>
              <Card.Body>
                <Card.Title className="card-title">{movie.title}</Card.Title>
                <Card.Img
                  variant="top"
                  src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                  alt=""
                />
                <ListGroup.Item className="item">
                  Movie Id: {movie.id}
                </ListGroup.Item>
                <ListGroup.Item className="item">
                  Realese: {movie.release_date}
                </ListGroup.Item>
                <ListGroup.Item className="item">
                  Rate: {movie.vote_average}
                </ListGroup.Item>
              </Card.Body>
            </Card>
          </div>
          <div className="flip-card-back">
            Overview:<br></br>
            {selectedMovie.id === movie.id && selectedMovie.overview}
          </div>
        </div>
      </div>
    );
  });
};

export default PopularMovieList;
