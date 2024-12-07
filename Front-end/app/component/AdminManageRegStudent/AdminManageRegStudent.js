import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { BiSolidHide } from "react-icons/bi";

import { BiSolidShow } from "react-icons/bi";



const AdminManageRegStudent = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [status, setStatus] = useState();

  const activeHandler = async (e) => {
    e.preventDefault();
    setStatus(false);
    const result = await fetch(`${domain}/api/admin/studentStatusChanger`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: e.target.id, Status: "Active" }),
    });
    const datas = await result.json();
    toast("Student is now Active !", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const inActiveHandler = async (e) => {
    e.preventDefault();
    setStatus(false);
    const result = await fetch(`${domain}/api/admin/studentStatusChanger `, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: e.target.id, Status: "InActive" }),
    });
    toast("Student is Deactivated !", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const detailsHandler = (e) => {
    e.preventDefault();
    navigate("/AdminManageStudentsDetails", { state: e.target.id });
  };

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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => (
        <div>
          {" "}
          <span
            style={{
              position: "relative",
              width: "255px",
              overflow: "visible",
              display: "block",
            }}
          >
            {showPassword[row._id] ? row.mobile : "********"}
            <span
              style={{
                position: "absolute",
                left: "100px",
                top: "94%",
                transform: "translateY(-99%)",
                cursor: "pointer",
                color: "black",
                overflow: "visible",
              }}
              onClick={() => togglePasswordVisibility(row._id)}
            >
              {showPassword[row._id] ? <BiSolidShow /> : <BiSolidHide />
}
            </span>
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Reg Date",
      selector: (row) => row.createdAt.substring(0, 10),
    },
    {
      name: "Status",
      selector: (row) => row.Status,
    },
    {
      name: "Update / Delete",
      cell: (row) => (
        <div>
          {row.Status === "Active" ? (
            <button
              onClick={inActiveHandler}
              id={row._id}
              className="btn  btn-danger mx-1"
            >
              In Active
            </button>
          ) : (
            <button
              onClick={activeHandler}
              id={row._id}
              className="btn  btn-primary mx-1"
            >
              Active
            </button>
          )}
          <button
            onClick={detailsHandler}
            id={row._id}
            className="btn  btn-primary"
          >
            Details
          </button>
        </div>
      ),
    },
  ];

  const [records, setrecords] = useState(data);
  const newArray = records.filter((obj) => obj.username !== "admin");

  const FilterHandler = (e) => {
    e.preventDefault();
    const newData = data.filter((row) => {
      return row.AuthorName.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });
    setrecords(newData);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      const result = await fetch(`${domain}/api/admin/allStudent`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          mytoken: Cookies.get("mytoken"),
        },
      });
      const data = await result.json();
      setrecords(data.student);
      setStatus(true);
      setdata(data.student);
    };
    getAllCategory();
  }, [status]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (userId) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <div className="m-5 myBG">
        <h3>Manage Registered Student</h3>
        <div>
          <div>
            <input
              placeholder="Search"
              type="text"
              onChange={FilterHandler}
              className="table-search-boxx"
            />
          </div>
          <DataTable columns={columns} data={newArray} pagination />
        </div>
      </div>
    </>
  );
};

export default AdminManageRegStudent;
