import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

function Profile() {
  const [sid, setSid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSid = localStorage.getItem("SID");
    if (!storedSid) {
      navigate("/");
    } else {
      setSid(storedSid);
    }
  }, [navigate]);
  return (
    <div className="message">
      {sid ? <p>You are logged in as {sid}</p> : <p>Loading...</p>}
      <button onClick={() => navigate("/home")}>
        <svg
          className="back-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 10l5.293 5.293a1 1 0 010 1.414z" />
        </svg>
        Go to Home
      </button>
    </div>
  );
}

export default Profile;
