import React, { useEffect, useState } from "react";
import "./booklisted.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../UserNavbar/UserNavbar";
import Cookies from "js-cookie";

const BookListed = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllBook = async () => {
      const result = await fetch(`${domain}/api/admin/allBook`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          mytoken: Cookies.get("mytoken"),
        },
      });
      const data = await result.json();
      setData(data.book);
    };
    getAllBook();
  }, []);

  return (
    <>
      {/* Navbar  */}
      <UserNavbar />
      <div className="content-wrapper myBGG">
        <div className="container">
          <div className="row pad-botm">
            <div className="col-md-12">
              <h2 className="header-line ubuntu-bold">All Books</h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                {/* Advanced Tables */}
                <div className="panel panel-default">
                  <div className="panel-heading"> Books</div>
                  <div className="panel-body">
                    {data.map((d) => (
                      <div
                        className="col-md-4"
                        style={{ float: "left", height: 300 }}
                        key={d.BookName}
                      >
                        <img
                          src={`data:image/png;base64,${d.BookPicture}`}
                          width={100}
                        />
                        <br />
                        <b>{d.BookName}</b>
                        <br />
                        {d.Category}
                        <br />
                        {d.Author}
                        <br />
                        {d.ISBN}
                        <br />
                        {d.isIssued && (
                          <p style={{ color: "red" }}>Book Already issued</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/*End Advanced Tables */}
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
      </section>{" "}
      {/* FOOTER SECTION END*/}
      {/* JAVASCRIPT FILES PLACED AT THE BOTTOM TO REDUCE THE LOADING TIME  */}
      {/* CORE JQUERY  */}
      {/* BOOTSTRAP SCRIPTS  */}
      {/* DATATABLE SCRIPTS  */}
      {/* CUSTOM SCRIPTS  */}
    </>
  );
};

export default BookListed;
