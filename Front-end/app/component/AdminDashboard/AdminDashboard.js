import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const [book, setBook] = useState("");
  const [notReturned, setNotReturned] = useState("");
  const [regUser, setRegUser] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getAllLength = async () => {
      const result = await fetch(`${domain}/api/admin/allLength`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          mytoken: Cookies.get("mytoken"),
        },
      });
      const data = await result.json();
      setRegUser(data.student);
      setNotReturned(data.issuedBook);
      setBook(data.book);
      setAuthor(data.authors);
      setCategory(data.category);
    };
    getAllLength();
  }, []);

  return (
    <>
      <AdminNavbar />

      {/* Dashboard starts */}
      <div className="dashboard-Parent myBG">
        <h2 className="ubuntu-bold">Administrator Dashboard</h2>
        <br />
        <div className="container ">
          <div className="cards container">
            <div className="row">
              <div className="col">
                <Link to="/AdminManageBooks">
                  <div className="card ">
                    <div>
                      <img
                        src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                        alt=""
                        className="card-img"
                      />
                    </div>
                    <div>{book}</div>
                    <div>Book Listed</div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link to="/AdminManageIssuedBooks">
                  <div className="card">
                    <div>
                      <img
                        src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                        alt=""
                        className="card-img"
                      />
                    </div>
                    <div>{notReturned}</div>
                    <div>All Issued Book</div>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link to="/AdminManageRegStudent">
                  <div className="card">
                    <div>
                      <img
                        src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                        alt=""
                        className="card-img"
                      />
                    </div>
                    <div>{regUser}</div>
                    <div>Registered User</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="cards container">
              <div className="row">
                <div className="col">
                  <Link to="/AdminManageAuthors">
                    <div className="card">
                      <div>
                        <img
                          src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                          alt=""
                          className="card-img"
                        />
                      </div>
                      <div>{author}</div>
                      <div>Authors Listed</div>
                    </div>
                  </Link>
                </div>
                <div className="col">
                  <Link to="/AdminManageCategories">
                    <div className="card">
                      <div>
                        <img
                          src="https://i.pinimg.com/736x/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg"
                          alt=""
                          className="card-img"
                        />
                      </div>
                      <div>{category}</div>
                      <div>Listed Categories</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
