import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminUpdateIssuedBookDetails = () => {
  const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_BACK_END_DOMAIN;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
  const location = useLocation();
  const id = location.state;

  const [student, setStudent] = useState("");
  const [book, setBook] = useState("");
  const [fine, setFine] = useState("");
  const [finee, setFinee] = useState("");
  const [issued, setIssued] = useState("");
  const [first, setfirst] = useState("");
  const [val, setval] = useState(false);

  const [issuedDate, setIssuedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const IssuedBookDetailsHandler = async () => {
      const result = await fetch(`${domain}/api/admin/IssuedBookDetails`, {
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
      setStudent(res.student);
      setBook(res.book);
      setIssued(res.issued);
      setIssuedDate(res.issued.createdAt.substring(0, 10));
      setReturnDate(res.issued.updatedAt.substring(0, 10));
      setfirst(res.issued.returned);
      setFinee(res.issued.Fine);
    };
    IssuedBookDetailsHandler();
  }, [val]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${domain}/api/admin/returnIssuedBook`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FINE: fine,
          StudentId: student.SID,
          ISBN: book.ISBN,
        }),
      });
      const res = await result.json();
      setIssued(res.issued);
      setval(true);
      if (res.status == 200) {
        alert("Fine Added hai");
        toast('Fine Added Successfully !', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="myBGG">
        
      <ToastContainer />
        <div className="container ">
          <h3>Student Details</h3>
          <div>
            <label> SID : {student.SID} </label>
          </div>
          <div>
            <label> Name : {student.name} </label>
          </div>
          <div>
            <label> Student Contact No : {student.mobile} </label>
          </div>
        </div>
        <div className="container ">
          <h3>Book Details</h3>
          <div>
            <img
              src={`data:image/png;base64,${book.BookPicture}`}
              alt="no img found"
              className="bookImg"
            />
          </div>
          <div>
            <label> Book Name : {book.BookName} </label>
          </div>
          <div>
            <label> ISBN : {book.ISBN} </label>
          </div>
          <div>
            <label> Book Issued Date : {issuedDate} </label>
          </div>
          <div>
            <label>
              {" "}
              Book Return Date :{" "}
              {issued.returned ? returnDate : "Not Returned Yet"}
            </label>
          </div>
        </div>

        <div className="container bg-body">
          {!first ? (
            <form onSubmit={submitHandler}>
              <div class="form-group">
                <label>Fine</label>
                <input
                  class="form-control"
                  type="text"
                  name="category"
                  required
                  onChange={(e) => setFine(e.target.value)}
                  value={fine}
                />
              </div>
              <button type="submit" name="create" class="btn btn-primary">
                Submit
              </button>
            </form>
          ) : (
            <div>Fine : {finee}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUpdateIssuedBookDetails;
