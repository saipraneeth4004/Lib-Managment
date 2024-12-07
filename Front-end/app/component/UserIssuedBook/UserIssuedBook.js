import React, { useEffect, useRef, useState } from "react";
import "./userIssuedBook.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import UserNavbar from "../UserNavbar/UserNavbar";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";

const UserIssuedBook = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
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

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Book Name",
      selector: (row) => row.book,
      sortable: true,
    },
    {
      name: "ISBN",
      selector: (row) => row.ISBN,
      sortable: true,
    },
    {
      name: "Issued Date",
      selector: (row) => row.issueDate.substring(0, 10),
      sortable: true,
    },
    {
      name: "Return Date",
      selector: (row) =>
        row.returned ? row.returnDate.substring(0, 10) : "Not Returned Yet",
      sortable: true,
    },
    {
      name: "Fine",
      selector: (row) => row.returned ? row.Fine : "" ,
      sortable: true,
    },
  ];
  const [data, setdata] = useState();
  const [records, setrecords] = useState(data);
  const FilterHandler = (e) => {
    e.preventDefault();
    const newData = data.filter((row) => {
      return row.BookName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setrecords(newData);
  };

  useEffect(() => {
    const studentDetails = async () => {
      const result = await fetch(`${domain}/api/admin/studentIssuedBook`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const res = await result.json();
      setrecords(res.AllBookDetailsArray);
      setdata(res.AllBookDetailsArray);
    };
    studentDetails();
  }, [id]);

  return (
    <>
      {/* Navbar  */}
      <UserNavbar />
      <div className="container myBGG">
        <h3>User Issued Books</h3>
        <div>
          <div>
            <input
              type="text"
              onChange={FilterHandler}
              className="table-search-box"
            />
          </div>
          <DataTable columns={columns} data={records} pagination />
        </div>
      </div>
    </>
  );
};

export default UserIssuedBook;
