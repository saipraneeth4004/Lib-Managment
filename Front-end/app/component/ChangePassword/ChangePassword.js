import React, { useEffect, useState } from "react";
import UserNavbar from "../UserNavbar/UserNavbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [password, setpassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [id, setid] = useState();

  useEffect(() => {
    const userApiFunction = async () => {
      const res1 = await fetch(`${domain}/api/user`, {
        headers: {
          Authorization: `Bearer ${`token`}`,
          mytoken: Cookies.get("mytoken"),
          Accept: "application/json",
        },
        method: "POST",
      });
      const result1 = await res1.json();
      setid(result1._id);
    };
    userApiFunction();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/changePassword`, {
        method: "POST",
        headers: {
          authorization: token,
          mytoken: Cookies.get("mytoken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          oldPassword: currentPassword,
          newPassword: password,
        }),
      });
      const res = await result.json();
      if (res.message == 200) {
        setConfirmPassword("");
        setpassword("");
        setCurrentPassword("");
        toast("Password Changed Successfully !", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (res.message == 204) {
        alert("Current Password Not Matched");
      }
      //   navigate("/userDashboard");
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

  const [showPasswordd, setShowPasswordd] = useState(false);
  const togglePasswordVisibilityy = (userId) => {
    setShowPasswordd((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      <UserNavbar />
      <div className="container myBGG">
        <ToastContainer />
        <h3>Change Password</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>
              <span>
                {" "}
                Current Password
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <input
                type="password"
                placeholder="Current Password"
                className="form-input"
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <span>
                {" "}
                New Password
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <input
                type="password"
                placeholder="New Password"
                className="form-input"
                required
                onChange={handlePasswordChange}
                value={password}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <span> Confirm New Password</span>
              <input
                type={showPasswordd[confirmPassword] ? "text" : "password"}
                placeholder="Re-Enter New Password"
                className="form-input"
                required
                id="confirmPassword"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <div>
                {!passwordsMatch && (
                  <p style={{ color: "red" }}>Passwords do not match</p>
                )}
                <button
                  for="showPassword"
                  // className="text-white"
                  onClick={() => togglePasswordVisibilityy(confirmPassword)}
                  id="showPassword"
                  style={{
                    textDecoration: "none",
                    border: "none",
                    backgroundColor: "inherit",
                    // color: "white",
                  }}
                >
                  Show Password
                </button>
              </div>
            </label>
          </div>
          {passwordsMatch && (
            <button type="submit" name="create" class="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
