// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { setToken } from "./auth";
// import { NavLink } from "react-router-dom";
// import { Alert } from 'react-bootstrap';

// function Login() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertVariant, setAlertVariant] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const navigate = useNavigate();
  
//   const loginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setToken(data.token);
//         navigate("/Home_page");
//       } else {
//         setShowAlert(true);
//         setAlertVariant("danger");
//         setAlertMessage("Email or password is incorrect.");
//       }
//     } catch (error) {
//       console.error(error);
//       setShowAlert(true);
//       setAlertVariant("danger");
//       setAlertMessage("An error occurred. Please try again later.");
//     }
//   };
  
//   return (
//     <div className="App">
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
//             {showAlert && (
//               <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//                 {alertMessage}
//               </Alert>
//             )}
//             <form id="loginform" onSubmit={loginSubmit}>
//               <div className="form-group">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="EmailInput"
//                   name="EmailInput"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   onChange={(event) => setEmail(event.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   placeholder="Password"
//                   onChange={(event) => setPassword(event.target.value)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//               <br></br>
//               <div>
//                 <NavLink className="btn btn-secondary mt-2" to="/create_user">
//                   Create User
//                 </NavLink>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Home_page");
      } else {
        setShowAlert(true);
        setAlertVariant("danger");
        setAlertMessage("Email or password is incorrect.");
        setTimeout(() => setShowAlert(false), 5000); // Set a timeout of 5 seconds to hide the alert
      }
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("An error occurred. Please try again later.");
      setTimeout(() => setShowAlert(false), 5000); // Set a timeout of 5 seconds to hide the alert
    }
  };
  
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            {showAlert && (
              <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <br></br>
              <div>
                <NavLink className="btn btn-secondary mt-2" to="/create_user">
                  Create User
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { setToken, getToken } from "./auth";
// import { NavLink } from "react-router-dom";
// import { Alert } from 'react-bootstrap';
// import Navbar from "./navbar";

// function Login() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertVariant, setAlertVariant] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const navigate = useNavigate();
//   const isLoggedIn = getToken() !== null; // Set isLoggedIn based on the token
  
//   const loginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setToken(data.token);
        
//         // Validate the token
//         const validateResponse = await fetch(`http://localhost:5000/validate_token?token=${data.token}`);
//         const validateData = await validateResponse.json();
//         if (validateResponse.ok && validateData.data.valid) {
//           navigate("/Home_page");
//         } else {
//           setToken(null);
//           setShowAlert(true);
//           setAlertVariant("danger");
//           setAlertMessage("Token validation failed.");
//         }
//       } else {
//         setShowAlert(true);
//         setAlertVariant("danger");
//         setAlertMessage("Email or password is incorrect.");
//       }
//     } catch (error) {
//       console.error(error);
//       setShowAlert(true);
//       setAlertVariant("danger");
//       setAlertMessage("An error occurred. Please try again later.");
//     }
//   };
  
//   return (
//     <div className="App">
//       {/* Render Navbar only if isLoggedIn is true */}
//       {isLoggedIn && <Navbar />}
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
//             {showAlert && (
//               <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//                 {alertMessage}
//               </Alert>
//             )}
//             <form id="loginform" onSubmit={loginSubmit}>
//               <div className="form-group">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="EmailInput"
//                   name="EmailInput"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   onChange={(event) => setEmail(event.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   placeholder="Password"
//                   onChange={(event) => setPassword(event.target.value)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//               <br></br>
//               <div>
//                 <NavLink className="btn btn-secondary mt-2" to="/create_user">
//                   Create User
//                 </NavLink>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
