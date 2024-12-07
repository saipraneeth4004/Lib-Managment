import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const id = location.state.id;
  const [category, setCategory] = useState("");
  const [active, setActive] = useState("");
  const [inActive, setinActive] = useState("");
  var checked;

  useEffect(() => {
    const gatherDetails = async () => {
      try {
        const result = await fetch(`${domain}/api/admin/categoryDetail`, {
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
        setCategory(res.CategoryName);
        if (res.Status === "Active") {
          setActive(res.Status);
        }
        if (res.Status === "Inactive") {
          setinActive(res.Status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    gatherDetails();
  }, []);

  const activeHandler = (e) => {
    e.preventDefault();
    setActive("Active");
    setinActive("");
  };
  const InactiveHandler = (e) => {
    e.preventDefault();
    setActive("");
    setinActive("Inactive");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/editCategory`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          CategoryName: category,
          Status: active || inActive,
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
        <h3>Edit Category</h3>

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
                {active === "Active" ? (
                  <input
                    type="radio"
                    name="status"
                    id="status"
                    onChange={(e) => setActive(e.target.value)}
                    value={active}
                    checked
                  />
                ) : (
                  <input
                    type="radio"
                    name="status"
                    id="status"
                    onClick={activeHandler}
                  />
                )}
              </label>
            </div>
            <div class="radio">
              <label>
                Inactive
                {inActive === "Inactive" ? (
                  <input type="radio" name="status" id="status" checked onChange={(e) => setinActive(e.target.value)}
                  value={inActive} />
                ) : (
                  <input
                    type="radio"
                    name="status"
                    id="status"
                    onClick={InactiveHandler}
                  />
                )}
              </label>
            </div>
          </div>
          <button type="submit" name="create" class="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEditCategory;
