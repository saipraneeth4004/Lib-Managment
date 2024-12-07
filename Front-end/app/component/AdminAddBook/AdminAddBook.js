import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminAddBook = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const [bookName, setbookName] = useState("");
  const [category, setcategory] = useState("");
  const [author, setauthor] = useState("");
  const [isbn, setisbn] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const activeCategory = allCategory.filter(item => item.Status === 'Active');



  // For set all authors
  useEffect(() => {
    const getAllauthor = async () => {
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
    getAllauthor();
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

  const formData = new FormData();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (image) {
      const fileInput = document.getElementById("imageinput");
      formData.append("BookPicture", fileInput.files[0], "File.png");
      formData.append("BookName", bookName);
      formData.append("Category", category);
      formData.append("Author", author);
      formData.append("ISBN", isbn);
      formData.append("Price", price);

      const data = await fetch(`${domain}/api/admin/createBook`, {
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
        alert("ISBN No. is Unique Number And already Given to Another Book");
      }
      const res = await data.json();
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container myBG">
        <h3>Add Book</h3>

        <form onSubmit={submitHandler} method="post">
          <div class="form-group">
            <label>Book Name</label>
            <input
              class="form-control"
              type="text"
              name="category"
              required
              onChange={(e) => setbookName(e.target.value)}
              value={bookName}
            />
          </div>
          <div class="form-group">
            <label>Author</label>
            <select
              class="form-control"
              name=""
              id=""
              onChange={(e) => {
                setauthor(e.target.value);
              }}
              value={author}
            >
              <option hidden selected>Select Author</option>
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
              name=""
              id=""
              onChange={(e) => setcategory(e.target.value)}
              value={category}
            >
              <option hidden selected>Select Category</option>
              {activeCategory.map((d, idx) => (
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
              required
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
              required
              onChange={(e) => setprice(e.target.value)}
              value={price}
            />
          </div>
          <div class="form-group">
            <label>Book Picture</label>
            <input
              class="form-control"
              type="file"
              name="image"
              required
              id="imageinput"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              accept="image/*"
            />
            {/* {image && <p> {image.split("\\").pop()} </p>} */}
          </div>

          <button type="submit" name="create" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddBook;
