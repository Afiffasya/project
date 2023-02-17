import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import "../style/Profile.css"

const API_KEY = process.env.REACT_APP_APIKEY;

function Profile() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionID = localStorage.getItem("SID");
    if (sessionID) {
      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionID}`
      })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Card className="message">
      <Card.Body>
        {username ? (
          <>
            <Card.Title className="tittle">You are logged in as {username}</Card.Title>
            <Button variant="primary" onClick={() => navigate("/Home")}>
              Go to Home
            </Button>
          </>
        ) : (
          <Card.Text className="tex">Loading...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Profile;
