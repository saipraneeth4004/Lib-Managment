import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminIssueNewBook = () => {
  const navigate = useNavigate();

  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const [sid, setSid] = useState("");
  const [isbn, setIsbn] = useState("");

  const [sidAvail, setSidAvail] = useState(false);
  const [isbnAvail, setIsbnAvail] = useState(false);

  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowParagraph(true);
    }, 6000);
    return () => clearTimeout(timeoutId);
  }, []);

  // gather all sid and isbn
  useEffect(() => {
    const gatherAllFunc = async () => {
      const data = await fetch(`${domain}/api/admin/gatherAll_sid_isbn`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
    };
    gatherAllFunc();
  }, []);

  // checks sid
  useEffect(() => {
    if (sid) {
      const checkSidAvailability = async () => {
        try {
          const response = await fetch(`${domain}/api/admin/check_sid`, {
            method: "POST",
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sid }),
          });
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          const data = await response.json();
          setSidAvail(data.sidAvail);
        } catch (error) {
          console.error("Error checking username availability:", error);
        }
      };
      const delay = setTimeout(checkSidAvailability, 500);
      return () => clearTimeout(delay);
    }
  }, [sid]);

  // checks isbn
  useEffect(() => {
    if (isbn) {
      const checkIsbnAvailability = async () => {
        try {
          const response = await fetch(`${domain}/api/admin/check_isbn`, {
            method: "POST",
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isbn }),
          });
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          const data = await response.json();
          setIsbnAvail(data.isbnAvail);
        } catch (error) {
          console.error("Error checking username availability:", error);
        }
      };
      const delay = setTimeout(checkIsbnAvailability, 1000);
      return () => clearTimeout(delay);
    }
  }, [isbn]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await fetch(`${domain}/api/admin/createissuedBook`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        StudentId: sid,
        ISBN: isbn,
      }),
    });

    const res = await result.json();
    if (res.message == 200) {
      navigate("/AdminManageIssuedBooks");
    }
    if (res.message == 201) {
      alert("Book Already Issued");
    }
    if (res.message == 202) {
      alert("Book Previously Issued By The Same Student And Can not ReIssued");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-1 myBG">
        <h3>Issue New Book</h3>

        <form onSubmit={submitHandler} method="post">
          <div class="form-group">
            <label>Student Id</label>
            <input
              class="form-control"
              type="text"
              name="category"
              required
              onChange={(e) => setSid(e.target.value)}
              value={sid}
            />
            {showParagraph && !sidAvail && (
              <p className="text-danger"> SID Not Available </p>
            )}
          </div>
          <div class="form-group">
            <label>ISBN NO.</label>
            <input
              class="form-control"
              type="text"
              name="category"
              required
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
            />
            {showParagraph && !isbnAvail && (
              <p className="text-danger"> ISBN Not Available </p>
            )}
          </div>
          {sidAvail && isbnAvail && (
            <button type="submit" name="create" class="btn btn-primary">
              Issue Book
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminIssueNewBook;
