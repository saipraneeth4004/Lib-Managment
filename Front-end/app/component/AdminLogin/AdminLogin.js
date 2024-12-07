import React, { useContext, useState } from "react";
import "./adminLogin.css";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { CentralizedData } from "@/app/Context/Context";
import Cookies from "js-cookie";

const AdminLogin = () => {
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

    if (result.status == 200) {
      const res = await result.json();
      const mytoken = res.token;
      Cookies.set("mytoken", mytoken, { expires: 1 });
      setAuth(true);
      if(res.admin){
        navigate("/AdminDashboard");
      }
      else{
        alert("You Are Not Admin & Not Having Access To Login.");
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
            <h1 className="title ubuntu-bold">Admin Login </h1>
            <form className="form" onSubmit={submitHandler}>
              <div className="form-group">
                <label>
                  <span className="text-white"> Username &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                  <input
                    type="text"
                    placeholder="Username"
                    className="form-input"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <span className="text-white"> Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="form-submit">
                  Login as Admin
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminLogin;
