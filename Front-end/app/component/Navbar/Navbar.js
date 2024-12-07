import React from "react";
import { Link } from "react-router-dom";
import "./nbar.css";
const Navbar = () => {
  const logoutHandler = async (e) => {
    e.preventDefault();
    Cookies.remove("token");

    router.push("/");
  };

  return (
    <>
      {/* Navbar Start */}

      <div className="myNav ">
        <div className="d-flex">
          <img className="navimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHak2cmeZ0nMuSIToIfPpj319fqI8DgrN5A&usqp=CAU" alt="img not found"  />
          <h2 className="pb-4 text-primary ubuntu-bold">Library Management System</h2>
        </div>
        <div className="d-flex ubuntu-medium">
          <Link to="/" className="nlinks nav-item nav-link active">
            Home
          </Link>
          <Link to="/userLogin" className="nlinks nav-item nav-link">
            User Login
          </Link>
          <Link to="/UserSignup" className="nlinks nav-item nav-link">
            User Signup
          </Link>

          <Link to="/AdminLogin" className="nlinks nav-item nav-link">
            Admin Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
