import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api";
import "../style/Home.css";
import {
  Container,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import PopularMovieList from "./Movies";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

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
      <Container>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand className="logo" href="#home">
            A-Movies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="navss">
            <Nav className="ml-auto">
              <Form inline="true" className="mr-auto form-center">
                <FormControl
                  type="text"
                  placeholder="Search your movies"
                  className="Movie-search"
                  onChange={({ target }) => {
                    setSearchText(target.value);
                    search(target.value);
                  }}
                />
              </Form>
              {searchText.length > 0 && (
                <div className="search-result-text">
                  <strong>{"Results for " + searchText}</strong>
                </div>
              )}
            </Nav>
            <NavDropdown
              title="Dashboard"
              id="collasible-nav-dropdown"
              className="mr-auto"
            >
              <NavDropdown.Item href="/profile" className="prof">
                Profile
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
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <div className="Movie-container">
        <PopularMovieList popularMovies={popularMovies} />
      </div>
    </div>
  );
}

export default Home;
