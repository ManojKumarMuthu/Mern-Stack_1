import React, { useEffect } from "react";
// import { Navigate, Route, Routes, useNavigate } from "react-router-dom";


// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if user is not loggedIn
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log('isLoggedIn', isLoggedIn);
    if (isLoggedIn === "false") {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;