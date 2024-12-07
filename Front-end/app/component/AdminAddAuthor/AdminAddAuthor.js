import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const AdminAddAuthor = () => {
  const navigate = useNavigate();

  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/createauthor`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      {/* {!loading ? ( */}
      <div>
        <AdminNavbar />

        <div className="container myBG">
          <h3>Add Author</h3>

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
              Create
            </button>
          </form>
        </div>
      </div>
      {/*  ) : (
         <Loading />
       )} */}
    </>
  );
};

export default AdminAddAuthor;
