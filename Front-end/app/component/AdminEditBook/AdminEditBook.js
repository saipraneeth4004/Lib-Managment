import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ChangeBookPicture from "../ChangeBookPicture/ChangeBookPicture";





const AdminEditBook = () => {
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
      } catch (error) {
        console.log(error);
      }
    };
    gatherDetails();
  }, []);

  const formData = new FormData();
  const submitHandler = async (e) => {
    e.preventDefault();
    // const fileInput = document.getElementById("imageinput");
    // formData.append("BookPicture", fileInput.files[0], "File.png");
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


  const ChangeBookPictureHandler = (e)=>{
    e.preventDefault();
    navigate("/ChangeBookPicture",{state:{id:id}})
  }

  return (
    <>
      <AdminNavbar />
      <div className="container myBG">
        <h3>Edit Book</h3>
        <div class="form-group">
          <label>Book Picture</label>
          <div>
            <img
              src={`data:image/png;base64,${pic}`}
              alt="no img found"
              className="bookImg"
            />
          </div>
            <button onClick={ChangeBookPictureHandler} className="btn btn-secondary">Change Picture</button>
        </div>

        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label>Book Name</label>
            <input
              class="form-control"
              type="text"
              name="category"
              onChange={(e) => setbookName(e.target.value)}
              value={bookName}
            />
          </div>
          <div class="form-group">
            <label>Author</label>
            <select
              class="form-control"
              onChange={(e) => setauthor(e.target.value)}
              value={author}
            >
              <option hidden selected>
                Select Author
              </option>

              {allAuthors.map((d, idx) => (
                <option key={d.AuthorName} value={d.AuthorName}>
                  {d.AuthorName}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select
              class="form-control"
              onChange={(e) => setcategory(e.target.value)}
              value={category}
            >
              <option hidden selected>
                Select Category
              </option>
              {allCategory.map((d, idx) => (
                <option key={d.CategoryName} value={d.CategoryName}>
                  {d.CategoryName}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label>ISBN No.</label>
            <input
              class="form-control"
              type="text"
              name="category"
              disabled
              onChange={(e) => setisbn(e.target.value)}
              value={isbn}
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              class="form-control"
              type="text"
              name="category"
              onChange={(e) => setprice(e.target.value)}
              value={price}
            />
          </div>
        
          <button type="submit" name="create" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEditBook;
