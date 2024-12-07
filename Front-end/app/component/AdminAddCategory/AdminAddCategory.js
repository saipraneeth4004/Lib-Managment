import React, { useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminAddCategory = () => {
  const navigate = useNavigate();

  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [category, setCategory] = useState("");
  const [active, setActive] = useState("");
  const [inActive, setinActive] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/createcategory`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryName: category,
          Status: active || inActive
        }),
      });
      const res = await result.json();
      navigate("/AdminManageCategories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container myBG">
        <h3>Add Category</h3>

        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label>Category Name</label>
            <input
              class="form-control"
              type="text"
              name="category"
              required
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
          </div>
          <div class="form-group">
            <label>Status</label>
            <div class="radio">
              <label>
                Active
                <input
                  type="radio"
                  name="status"
                  id="status"
                  onChange={(e) => setActive("Active")}
                  value={active}
                />
              </label>
            </div>
            <div class="radio">
              <label>
                Inactive
                <input
                  type="radio"
                  name="status"
                  id="status"
                  onChange={(e) => setinActive("Inactive")}
                  value={inActive}
                />
              </label>
            </div>
          </div>
          <button type="submit" name="create" class="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminAddCategory;
