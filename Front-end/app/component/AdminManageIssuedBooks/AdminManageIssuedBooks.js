import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminManageIssuedBooks = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const [data, setdata] = useState([]);

  const updateHandler = (e) => {
    e.preventDefault();
    navigate("/AdminUpdateIssuedBookDetails", { state: e.target.id });
  };

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Student",
      selector: (row) => row.student,
      sortable: true,
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
      selector: (row) => row.issuedDate.substring(0, 10),
      sortable: true,
    },
    {
      name: "Returned Date",
      selector: (row) =>
        !row.isIssued ? row.returnDate.substring(0, 10) : "Not Returned Yet",
      sortable: true,
    },
    {
      name: "Action ",
      cell: (row) => (
        <div>
          <button
            onClick={updateHandler}
            id={row._id}
            className="btn  btn-primary mx-1"
          >
            EDIT
          </button>
        </div>
      ),
    },
  ];

  const [records, setrecords] = useState(data);
  const FilterHandler = (e) => {
    e.preventDefault();
    const newData = data.filter((row) => {
      return row.student.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setrecords(newData);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      const result = await fetch(`${domain}/api/admin/allissuedBook`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      const datas = await result.json();
      console.log(datas)
      setrecords(datas.AllBookDetailsArray);
      setdata(datas.AllBookDetailsArray);
    };
    getAllCategory();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container myBG">
        <h3>Manage Issued Books</h3>
        <div>
          <div>
            <input
              type="text"
              onChange={FilterHandler}
              className="table-search-box"
              placeholder="Search"
            />
          </div>
          <DataTable columns={columns} data={records} pagination />
        </div>
      </div>
    </>
  );
};

export default AdminManageIssuedBooks;
