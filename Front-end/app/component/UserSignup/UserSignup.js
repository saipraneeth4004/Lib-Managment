"use client";
import React, { useContext, useEffect, useState } from "react";
import "./userSignup.css";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { CentralizedData } from "@/app/Context/Context";

const UserSignup = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const router = useRouter();
  const navigate = useNavigate();
  const [auth, setAuth, admin, setAdmin] = useContext(CentralizedData);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setpassword] = useState("");

  const generateRandom5DigitNumber = () => {
    const min = 10000; // Minimum 5-digit number (inclusive)
    const max = 99999; // Maximum 5-digit number (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomNum = "SID" + generateRandom5DigitNumber();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/student/signup`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          mobile: mobile,
          password: password,
          SID: randomNum,
        }),
      });
      const res = await result.json();
      setAuth(true);
      navigate("/userLogin");
    } catch (error) {
      console.log(error);
    }
  };

  // password check methods
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    var passwordInput = document.getElementById("password");
    var showPasswordCheckbox = document.getElementById("showPassword");
    passwordInput.type = showPasswordCheckbox.type ? "text" : "password";
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  // const [checkUsername, setCheckUsername] = useState();
  // // gather all username
  // useEffect(() => {
  //   const gatherAllFunc = async () => {
  //     const data = await fetch(`${domain}/api/admin/check_username`, {
  //       method: "POST",
  //       headers: {
  //         authorization: token,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: username }),
  //     });
  //     const res = await data.json();
  //     console.log(res, "this is check username");
  //     setCheckUsername(res);
  //   };
  //   gatherAllFunc();
  // }, [username]);

  const [showPasswordd, setShowPasswordd] = useState(false);
  const togglePasswordVisibilityy = (userId) => {
    setShowPasswordd((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main>
        <section className="form-section ubuntu-medium">
          <div className="form-wrapper">
            <h1 className=" title ubuntu-medium">Sign up</h1>
            <form className="form" onSubmit={submitHandler}>
              <div className="">
                <div className="form-group">
                  <label>
                    <span className="text-white">
                      {" "}
                      Name
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="form-input"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>
                  <span className="text-white">
                    {" "}
                    Username
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>

                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form-input"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    pattern="^[a-z]{1,15}$"
                    maxlength="15"
                    title="Username Should Only Contain Lowercase and No spaces"
                  />
                  {/* <p className="text-danger">username not available</p> */}
                </label>
              </div>
              <div className="form-group">
                <label>
                  <span className="text-white">
                    Mobile No.
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile No."
                    className="form-input"
                    required
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
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
                    required
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <span className="text-white">
                    {" "}
                    Confirm Password
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <input
                    type={showPasswordd[confirmPassword] ? "text" : "password"}
                    placeholder="Password"
                    className="form-input"
                    required
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <div>
                    {!passwordsMatch && (
                      <p style={{ color: "red" }}>Passwords do not match</p>
                    )}
                    <span
                      for="showPassword"
                      // className="text-white"
                      onClick={() => togglePasswordVisibilityy(confirmPassword)}
                      id="showPassword"
                      style={{
                        textDecoration: "none",
                        border: "none",
                        backgroundColor: "inherit",
                        color: "white",
                      }}
                    >
                      Show Password
                    </span>
                  </div>
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  defaultValue="Sign Up"
                  className="form-submit"
                />
              </div>
              <footer className="form-footer">
                <div>
                  Already have an account?
                  <Link to="/userLogin" className="form-link">
                    Log in
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

export default UserSignup;
