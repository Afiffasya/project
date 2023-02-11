import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api";
import Carousell from "./carousel";
import "../style/Home.css";
import {
  Container,
  Navbar,
  Row,
  Col,
  Card,
  ListGroup,
  NavDropdown
} from "react-bootstrap";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    const [selectedMovie, setSelectedMovie] = useState({});

    const handleShow = (movie) => {
      setSelectedMovie(movie);
    };

    return popularMovies.map((movie, i) => {
      return (
        <div className="flip-card" onMouseEnter={() => handleShow(movie)}>
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
                  <ListGroup.Item className="item">Movie Id: {movie.id}</ListGroup.Item>
                  <ListGroup.Item className="item">Realese: {movie.release_date}</ListGroup.Item>
                  <ListGroup.Item className="item">Rate: {movie.vote_average}</ListGroup.Item>
                </Card.Body>
              </Card>
            </div>
            <div className="flip-card-back">Overview:<br></br>
              {selectedMovie.id === movie.id && selectedMovie.overview}
            </div>
          </div>
        </div>
      );
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("sessionId");
    window.alert("You have successfully logged out.");
  };

  const search = async (q) => {
    if (q.length > 2) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };
  return (
    <div className="nav">
      <Container fluid style={{ marginBottom: "40px" }}>
        <Row>
          <Navbar collapseOnSelect expand="lg">
            <Col xs="4" className="logo" href="#home">
              A-Movies
            </Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="navss">
              <Col xs={6}>
                <input
                  placeholder="Search your movies"
                  className="Movie-search"
                  onChange={({ target }) => search(target.value)}
                />
              </Col>
              <Col xs={6} md={4}>
              <NavDropdown title="Dashboard" id="nav-dropdown">
        <NavDropdown.Item>
        <NavLink to="/profile" className="prof">
                  Account
                </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
        <NavLink to="/" className="prof" onClick={handleLogout}>
                  Logout
                </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
              </Col>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
      <Carousell />
      <div className="Movie-container">
        <PopularMovieList />
      </div>
    </div>
  );
}

export default Home;
