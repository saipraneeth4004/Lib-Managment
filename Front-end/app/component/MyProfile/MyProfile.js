import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../UserNavbar/UserNavbar";
import Cookies from "js-cookie";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const MyProfile = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [sid, setSid] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const dateOnly = date.substring(0, 10);

  useEffect(() => {
    const userApiFunction = async () => {
      const res = await fetch(`${domain}/api/user`, {
        headers: {
          Authorization: `Bearer ${`token`}`,
          mytoken: Cookies.get("mytoken"),
          Accept: "application/json",
        },
        method: "POST",
      });

      const result = await res.json();
      setName(result.name);
      setUsername(result.username);
      setMobile(result.mobile);
      setSid(result.SID);
      setStatus(result.Status);
      setDate(result.createdAt);
    };
    userApiFunction();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await fetch(`${domain}/api/updateProfile`, {
      method: "POST",
      headers: {
        authorization: token,
        mytoken: Cookies.get("mytoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sid, name, mobile }),
    });

    const res = await result.json();
    alert("Profile Updated Successfully");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (userId) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      {/* Navbar   */}
      <UserNavbar />

      <div className="content-wrapper myBGG">
        <div className="container">
          <div className="row pad-botm">
            <div className="col-md-12">
              <h4 className="header-line">My Profile</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 col-md-offset-1">
              <div className="panel panel-danger">
                <div className="panel-body">
                  <form name="signup" method="post" onSubmit={submitHandler}>
                    <div className="form-group">
                      <label>Student ID : </label>
                      {"   "} {sid}
                    </div>
                    <div className="form-group">
                      <label>Username : </label>
                      {"   "} {username}
                    </div>
                    <div className="form-group">
                      <label>Reg Date : </label>
                      {"   "}
                      {dateOnly}
                    </div>
                    <div className="form-group">
                      <label>Profile Status : </label>
                      <span style={{ color: "green" }}>
                        {"   "}
                        {status}
                      </span>
                    </div>
                    <div className="form-group">
                      <label> Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="fullanme"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile</label>
                      <input
                        className="form-control"
                        type={showPassword[mobile] ? "text" : "password"}
                        name="fullanme"
                        autoComplete="off"
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                        id="mobile"
                      />{" "}
                      <span
                        style={{
                          position: "relative",
                          width: "100%",
                          overflow: "visible",
                          display: "block",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            right: "1%",
                            // top: "1%",
                            transform: "translateY(-125%)",
                            cursor: "pointer",
                            color: "black",
                            overflow: "visible",
                          }}
                          onClick={() => togglePasswordVisibility(mobile)}
                        >
                          {showPassword[mobile] ? (
                            <BiSolidShow />
                          ) : (
                            <BiSolidHide />
                          )}
                        </span>
                      </span>
                    </div>

                    <button
                      type="submit"
                      name="update"
                      className="btn btn-primary"
                      id="submit"
                    >
                      Update Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT-WRAPPER SECTION END*/}
      <section className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              © 2023 Online Library Management System
            </div>
          </div>
        </div>
      </section>
      {/* BOOTSTRAP SCRIPTS  */}
      {/* CUSTOM SCRIPTS  */}
    </>
  );
};

export default MyProfile;
