"use client";
import React, { useEffect, useState } from "react";
import "./userDashboard.css";
import { useRouter } from "next/navigation";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import UserNavbar from "../UserNavbar/UserNavbar";

const UserDashboard = () => {
  const [data, setData] = useState("");
  const [id, setid] = useState();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

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

  useEffect(() => {
    const userApiFunction2 = async () => {
      const res2 = await fetch(`${domain}/api/userDashboardLength`, {
        method: "POST",
        headers: {
          authorization: token,
          mytoken: Cookies.get("mytoken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const result2 = await res2.json();
      setData(result2);
    };
    userApiFunction2();
  }, [id]);

  return (
    <>
      <UserNavbar />
      {/* Dashboard starts */}
      <div className="dashboard-Parent myBGG ">
        <h2 className="ubuntu-bold">User Dashboard</h2>
        <br />
        <div className="cards">
          <Link to="/BookListed">
            <div className="card">
              <div>
                <img
                  src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                  alt=""
                  className="card-img"
                />
              </div>
              <div>{data.book}</div>
              <div>Book Listed</div>
            </div>
          </Link>

          <Link to="/BookNotReturn">
            <div className="card">
              <div>
                <img
                  src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                  alt=""
                />
              </div>
              <div>{data.notReturnedYet}</div>
              <div>Books Not Returned Yet</div>
            </div>
          </Link>

          <Link to="/UserIssuedBook">
            <div className="card">
              <div>
                <img
                  src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                  alt=""
                />
              </div>
              <div>{data.issuedBook}</div>
              <div>Issued Books</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
