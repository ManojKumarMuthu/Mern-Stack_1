// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [isError, setIsError] = useState(false) //true = error, false = no error.
//   const error = "Email or Password not matched"
//   const [passwordError, setpasswordError] = useState("");
//   const [emailError, setemailError] = useState("");
//   const navigate = useNavigate();
  
//   const loginSubmit = (e) => {
//     e.preventDefault();
//     logMe();
//   };
  
//   const logMe = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var raw = JSON.stringify({
//       "email": email,
//       "password": password
//     });
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
//     fetch("http://localhost:5000/login", requestOptions)
//       .then(response => response.text())
//       .then(result => {
//         localStorage.setItem("isLoggedIn", result);
//         if(result === "true"){
//           navigate("/");
//         } else {
//           setIsError(true)
//         }
//       })
//       .catch(error => console.log('error', error));
//   }
  
//   return (
//     <div className="App">
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
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
//                 <small id="emailHelp" className="text-danger form-text">
//                   {emailError}
//                 </small>
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
//                 <small id="passworderror" className="text-danger form-text">
//                   {passwordError}
//                 </small>
//               </div>
//               {isError ? (
//                 <p style={{color: "red"}}>{error}</p>
//               ) : (
//                 <>
//                 </>
//               )}
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;






import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "./auth";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false) //true = error, false = no error.
  const error = "Email or Password not matched"
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
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
        setToken(data.token);
        navigate("/Home_page");
      } else {
        setIsError(true)
      }
    } catch (error) {
      console.error(error);
      setIsError(true)
    }
  };
  
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
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
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
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
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              {isError ? (
                <p style={{color: "red"}}>{error}</p>
              ) : (
                <>
                </>
              )}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;




// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import Alert  from "react-bootstrap/Alert";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function Login() {
//   const [showAlert, setShowAlert] = useState(true);
//   const [showToast, setShowToast] = useState(true);
//   const isLoggedIn = localStorage.isLoggedIn;
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [isError, setIsError] = useState(false) //true = error, false = no error.
//   const [isLogin, setIsLogin] = useState(false) //true = error, false = no error.
//   const error = "Connexion Fail"
//   const [passwordError, setpasswordError] = useState("");
//   const [emailError, setemailError] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (error) {
//       setShowAlert(true);
//       setTimeout(() => {
//         setShowAlert(false);
//         setIsError('');
//       }, 5000);
//     }
//   }, [error]);
//   const logMe = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var raw = JSON.stringify({
//       "email": email,
//       "password": password
//     });
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
//     fetch("http://localhost:5000/login", requestOptions)
//       .then(response => response.text())
//       .then(result => {
//         // isConnected(result)
//           localStorage.setItem("isLoggedIn", result);
//         if(result === "true"){
//     toast.success(':unicorn_face: Connected', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//     });
//     setTimeout(() => window.location = "/", 7000);
// } else {
//     setIsError(true);
//     setTimeout(() => setIsError(false), 5000);
// }
//       })
//       .catch(error => console.log('error', error));
//   }
//   return (
//     <div className="App">
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
//             <form id="loginform" onSubmit={logMe}>
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
//                 <small id="emailHelp" className="text-danger form-text">
//                   {emailError}
//                 </small>
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
//                 <small id="passworderror" className="text-danger form-text">
//                   {passwordError}
//                 </small>
//               </div>
//               {showAlert &&
//                   <Alert variant="danger" onClose={() => setShowAlert(false)}>
//                   <Alert.Heading>{error}</Alert.Heading>
//                   </Alert>
//               }
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             <ToastContainer
//               position="top-right"
//               autoClose={5000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="light"
//               />
//             </form>
//           </div>
//           {/* Source: <a href="https://askavy.com/react-form/">React Form</a> */}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Login;