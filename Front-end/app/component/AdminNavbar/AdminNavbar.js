import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";
import { CentralizedData } from "@/app/Context/Context";

const AdminNavbar = () => {


    const navigate = useNavigate();
    const [auth, setAuth, admin, setAdmin] = useContext(CentralizedData);


    const logoutHandler = (e) => {
        e.preventDefault();
        Cookies.remove("mytoken");
        setAuth(false);  
        navigate("/");
      };
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar shadow  " style={{ top: 0 }}>
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center justify-content-end mr-55"
        >
          <h2 className="m-0 text-primary ubuntu-bold">
            Library Management System
          </h2>
        </Link>
        <div className="d-flex navRight justify-content-end">
          <div>
            <Link to="/AdminDashboard" className="nav-item nav-link">
              Dashboard
            </Link>
          </div>
          <div>
            <NavDropdown title="Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/AdminAddCategory">Add Categories</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/AdminManageCategories">Manage Categories</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div>
            <NavDropdown title="Authors" id="collapsible-nav-dropdown">
              <NavDropdown.Item >
                <Link to="/AdminAddAuthor">
                Add Author
                </Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
               <Link to="/AdminManageAuthors">
                Manage Author
               </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div>
            <NavDropdown title="Books" id="collapsible-nav-dropdown">
              <NavDropdown.Item >
                <Link to="/AdminAddBook">
                Add Book
                </Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
                <Link to="/AdminManageBooks">
                Manage Book
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div>
            <NavDropdown title="Issue Books" id="collapsible-nav-dropdown">
              <NavDropdown.Item >
                <Link to="/AdminIssueNewBook">
                Issue New Book
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item >
               <Link to="/AdminManageIssuedBooks">
                Manage Issued Book
               </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div>
            <Link to="/AdminManageRegStudent" className="nav-item nav-link">
              Reg Student
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary  px-lg-5 d-lg-block"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
