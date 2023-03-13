import React from "react";

// // We import bootstrap to make our application look better.
// import "bootstrap/dist/css/bootstrap.css";

// // We import NavLink to utilize the react router.
// import { NavLink } from "react-router-dom";

// // Here, we display our Navbar
// export default function Navbar() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <NavLink className="navbar-brand" to="/">
//         <img style={{"width" : 10 + '%'}} src="/rocketLogo.png"  alt="Logo for my website"></img>
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
//               <NavLink className="nav-link" to="/create">
//                 Create Record
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }


// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink, useNavigate } from "react-router-dom";
// Here, we display our Navbar
export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
   };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 10 + '%'}} src="/rocketLogo.png"  alt="Logo for my website"></img>
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
              {isLoggedIn ? (
                <div>
                  <button variant="danger" onClick={logout}>
                  Logout
                </button>
               <NavLink className="nav-link" to="/create">
               Create Agent
             </NavLink>
             </div>
            ) : (
              <div>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              </div>
            )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}