import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import DataTable from "react-data-table-component";

const AdminManageStudentsDetails = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const location = useLocation();
  const [data, setdata] = useState([]);
  const id = location.state;

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Student Id",
      selector: (row) => row.SID,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.student,
      sortable: true,
    },
    {
      name: "Issued Book",
      selector: (row) => row.book,
      sortable: true,
    },
    {
      name: "Issued Date",
      selector: (row) => row.issueDate.substring(0, 10),
    },
    {
      name: "Returned Date",
      selector: (row) =>  row.returned ? row.returnDate.substring(0, 10) : "Not Returned Yet",
    },
    {
      name: "Fine",
      selector: (row) => row.Fine,
    },
  ];

  const [records, setrecords] = useState(data);
  const newArray = records.filter((obj) => obj.username !== "admin");

  const FilterHandler = (e) => {
    e.preventDefault();
    const newData = data.filter((row) => {
      return row.student.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
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
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="m-5 myBG">
        <h3> Registered Student Issued Book Details</h3>
        <div>
          <div>
            <input
              placeholder="Search"
              type="text"
              onChange={FilterHandler}
              className="table-search-boxx"
            />
          </div>
          <DataTable columns={columns} data={records} pagination />
        </div>
      </div>
    </>
  );
};

export default AdminManageStudentsDetails;
