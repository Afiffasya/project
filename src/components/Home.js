import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api";
import "../style/Home.css";
import { Container, Navbar, Row, Col, NavDropdown } from "react-bootstrap";
import PopularMovieSlider from "./Movies";
// import { useNavigate } from "react-router-dom";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("sessionId")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

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
  const [searchText, setSearchText] = useState("");
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
                  onChange={({ target }) => {
                    setSearchText(target.value);
                    search(target.value);
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <NavDropdown title="Dashboard" id="nav-dropdown">
                  <NavDropdown.Item href="/profile" className="prof">
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/"
                    className="prof"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Col>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
      {searchText.length > 0 && (
        <div className="search-result-text">
          <strong>{"Results for " + searchText}</strong>
        </div>
      )}
      <div className="Movie-container">
        <PopularMovieSlider popularMovies={popularMovies} />
      </div>
    </div>
  );
}

export default Home;
