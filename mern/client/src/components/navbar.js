// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import { removeToken } from "./auth";
// import { Alert } from 'react-bootstrap';

// export default function Navbar() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const navigate = useNavigate();
//   const logout = () => {
//     removeToken();
//     navigate("/login");
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <NavLink className="navbar-brand" to="/Home_page">
//           <img style={{ width: 10 + "%" }} src="/rocketLogo.png" alt="Logo for my website"></img>
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               {isLoggedIn ? (
//                 <div>
//                   <button className="btn btn-danger" onClick={logout}>
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <NavLink className="nav-link" to="/">
//                     Login
//                   </NavLink>
//                 </div>
//               )}
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }





import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "./auth";
import { Alert } from 'react-bootstrap';

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };

  // Only show the navbar if the user is logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/Home_page">
          <img style={{ width: 10 + "%" }} src="/rocketLogo.png" alt="Logo for my website"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

