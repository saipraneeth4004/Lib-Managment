import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ChangeBookPicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const id = location.state.id;

  const [bookName, setbookName] = useState("");
  const [category, setcategory] = useState("");
  const [author, setauthor] = useState("");
  const [isbn, setisbn] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState("");
  const [pic, setpic] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const bookimage = useRef(image);

  // For set all authors
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
      setAllAuthors(data.authors);
    };
    getAllCategory();
  }, []);

  // For set all category
  useEffect(() => {
    const getAllCategory = async () => {
      const result = await fetch(`${domain}/api/admin/allCategory`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
          mytoken: Cookies.get("mytoken"),
        },
      });
      const data = await result.json();
      setAllCategory(data.category);
    };
    getAllCategory();
  }, []);

  //   gatherDetails
  useEffect(() => {
    const gatherDetails = async () => {
      try {
        const result = await fetch(`${domain}/api/admin/bookDetail`, {
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
        setbookName(res.BookName);
        setauthor(res.Author);
        setcategory(res.Category);
        setisbn(res.ISBN);
        setprice(res.Price);
        setpic(res.BookPicture);
        // setImage(res.BookPicture)
      } catch (error) {
        console.log(error);
      }
    };
    gatherDetails();
  }, []);

  const formData = new FormData();
  const submitHandler = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("imageinput");
    formData.append("BookPicture", fileInput.files[0], "File.png");
    formData.append("BookName", bookName);
    formData.append("Category", category);
    formData.append("Author", author);
    formData.append("ISBN", isbn);
    formData.append("Price", price);
    formData.append("_id", id);
    const data = await fetch(`${domain}/api/admin/editBook`, {
      method: "POST",
      headers: {
        Authorization: token,
        eztoken: Cookies.get("mytoken"),
      },
      body: formData,
    });
    if (data.status == 201) {
      navigate("/AdminManageBooks");
    } else {
      alert("something went wrong");
    }
    const res = await data.json();
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h3>Edit Book Picture</h3>
        <div class="form-group">
          <label>Book Picture</label>
          <div>
            <img
              src={`data:image/png;base64,${pic}`}
              alt="no img found"
              className="bookImg"
            />
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label>Book Name</label>
            <h4>{bookName}</h4>
          </div>

          <div class="form-group">
            <input
              class="form-control"
              type="file"
              name="image"
              id="imageinput"
              value={image}
              defaultValue={pic}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              accept="image/*"
              // style={{display:"none"}}
            />
            {image && <p> {image.split("\\").pop()} </p>}
          </div>

          <button type="submit" name="create" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeBookPicture;
