import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CentralizedData } from "@/app/Context/Context";


const UserNavbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth, admin, setAdmin] = useContext(CentralizedData);

  const logoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove('mytoken');
    setAuth(false);
    navigate("/userLogin");
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
          <Link to="/userDashboard" className="nlinks nav-item nav-link">
          DASHBOARD
          </Link>
          <Link to="/UserIssuedBook" className="nlinks nav-item nav-link">
          ISSUED BOOK
          </Link>
          <Link to="/MyProfile" className="nlinks nav-item nav-link">
          MY PROFILE
          </Link>

          <Link to="/ChangePassword" className="nlinks nav-item nav-link">
            CHANGE PASSWORD
          </Link>
          <button
          type="button"
            className="btn btn-primary  px-lg-5  d-lg-block"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
