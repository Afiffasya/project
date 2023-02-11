import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

function Profile() {
  const [sid, setSid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSid = localStorage.getItem("SID");
    if (!storedSid) {
      navigate("/login");
    } else {
      setSid(storedSid);
    }
  }, [navigate]);
// console.log(sid)
  return (
    <>
      {sid ? (
        <h1>You are logged in as {sid}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Profile;
