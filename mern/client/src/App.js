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
import Create_user from "./components/user";
import Home_page from "./components/homepage";
import Transaction from "./components/transaction";
import CreateTransaction from "./components/createTransaction";



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
        <Route exact path="/RecordList" element={<RecordList />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Home_page" element={<Home_page />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create_user" element={<Create_user />} />
        <Route exact path="/transaction" element={<Transaction />} />
        <Route exact path="/CreateTransaction" element={<CreateTransaction />} />
      </Routes>

      </div>
    </div>
  );
};

export default App;