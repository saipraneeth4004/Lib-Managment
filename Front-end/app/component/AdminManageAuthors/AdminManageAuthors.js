import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminManageAuthors = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [del, setdel] = useState();

  const updateHandler = (e) => {
    e.preventDefault();
    navigate("/AdminEditAuthor", { state: { id: e.target.id } });
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/deleteAuthor`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: e.target.id }),
      });
      const res = await result.json();
      setdel(true);
      toast('Author Deleted Successfully !', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Author",
      selector: (row) => row.AuthorName,
      sortable: true,
    },
    {
      name: "Creation Date",
      selector: (row) => row.createdAt.substring(0,10),
      sortable: true,
    },
    {
      name: "Updation Date",
      selector: (row) => row.updatedAt.substring(0,10),
      sortable: true,
    },
    {
      name: "Update / Delete",
      cell: (row) => (
        <div>
          <button
            onClick={updateHandler}
            id={row._id}
            className="btn  btn-primary mx-1"
          >
            Update
          </button>
          <button
            onClick={deleteHandler}
            id={row._id}
            className="btn  btn-danger"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [records, setrecords] = useState(data);
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
      const result = await fetch(`${domain}/api/admin/allAuthors`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          mytoken: Cookies.get("mytoken"),
        },
      });
      const data = await result.json();
      setrecords(data.authors);
      setdata(data.authors);
      setdel(false);
    };
    getAllCategory();
  }, [del]);

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <div className="container myBG">
        <h3>Manage Authors</h3>
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

export default AdminManageAuthors;
