"use client";
import React, { useContext, useState } from "react";
import "./userLogin.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CentralizedData } from "@/app/Context/Context";

const UserLogin = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const navigate = useNavigate();
  const [auth, setAuth, admin, setAdmin] = useContext(CentralizedData);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await fetch(`${domain}/api/student/signin`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const userr = await result.json();
    if (result.status == 200) {
      if (userr.student_data.Status == "Active") {
        const mytoken = userr.token;
        Cookies.set("mytoken", mytoken, { expires: 1 });
        setAuth(true);
        navigate("/userDashboard");
      } else {
        alert("Your account has been deactivated by the Library");
      }
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <>
      {/* Navbar Start */}
      <Navbar />
      <main>
        <section className="form-section ubuntu-medium">
          <div className="form-wrapper">
            <h1 className="title ubuntu-medium">User Login </h1>
            <form
              className="form d-flex flex-column justify-content-center"
              onSubmit={submitHandler}
            >
              <div className="form-group">
                <label>
                  <span className="text-white">
                    {" "}
                    Username
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-input"
                    required=""
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <span className="text-white">
                    {" "}
                    Password
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>

                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </label>
              </div>
              <div className="form-group">
                <input type="submit" className="form-submit" value="Login" />
              </div>
              <footer className="form-footer">
                <div>
                  Don't have an account?
                  <Link to="/UserSignup" className="form-link">
                    Sign Up
                  </Link>
                </div>
              </footer>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserLogin;
