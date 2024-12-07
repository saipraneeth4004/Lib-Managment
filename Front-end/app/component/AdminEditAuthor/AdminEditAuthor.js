import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEditAuthor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [name, setName] = useState("");

  const id = location.state.id;

  useEffect(() => {
    const gatherDetails = async () => {
      try {
        const result = await fetch(`${domain}/api/admin/authorDetail`, {
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
        setName(res.AuthorName);
      } catch (error) {
        console.log(error);
      }
    };
    gatherDetails();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/editAuthor`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          AuthorName: name,
        }),
      });
      const res = await result.json();
      navigate("/AdminManageAuthors");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container myBG">
        <h3>Edit Author</h3>

        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label>Author Name</label>
            <input
              class="form-control"
              type="text"
              name="category"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <button type="submit" name="create" class="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEditAuthor;
