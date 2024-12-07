import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Cookies from "js-cookie";
import "./amb.css";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminManageBooks = () => {
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [del, setdel] = useState();

  const updateHandler = (e) => {
    e.preventDefault();
    navigate("/AdminEditBook", { state: { id: e.target.id } });
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/deleteBook`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: e.target.id }),
      });
      const res = await result.json();
      setdel(true);
      toast('Book Deleted Successfully !', {
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
      name: "Book Name",
      selector: (row) => row.BookName,
      sortable: true,
      cell: (row) => (
        <div>
          <img
            src={`data:image/png;base64,${row.BookPicture}`}
            alt="no img found"
            className="bookImg"
          />
          <p>{row.BookName}</p>
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.Author,
      sortable: true,
    },
    {
      name: "ISBN",
      selector: (row) => row.ISBN,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
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
      return row.BookName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setrecords(newData);
  };

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
      setrecords(data.book);
      setdata(data.book);
      setdel(false);
    };
    getAllBook();
  }, [del]);

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <div className="m-2 myBG">
        <h3>Manage Books</h3>
        <div>
          <div>
            <input
              type="text"
              onChange={FilterHandler}
              className="table-search-boxx"
              placeholder="Search" 
            />
          </div>
          <DataTable columns={columns} data={records} pagination />
        </div>
      </div>
    </>
  );
};

export default AdminManageBooks;
