import React from "react";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "../UserLogin/UserLogin";
import UserSignup from "../UserSignup/UserSignup";
import AdminLogin from "../AdminLogin/AdminLogin";
import UserDashboard from "../UserDashboard/UserDashboard";
import UserIssuedBook from "../UserIssuedBook/UserIssuedBook";
import MyProfile from "../MyProfile/MyProfile";
import BookListed from "../BookListed/BookListed";
import BookNotReturn from "../BookNotReturn/BookNotReturn";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminManageAuthors from "../AdminManageAuthors/AdminManageAuthors";
import AdminManageBooks from "../AdminManageBooks/AdminManageBooks";
import AdminManageCategories from "../AdminManageCategories/AdminManageCategories";
import AdminManageIssuedBooks from "../AdminManageIssuedBooks/AdminManageIssuedBooks";
import AdminManageRegStudent from "../AdminManageRegStudent/AdminManageRegStudent";
import AdminAddAuthor from "../AdminAddAuthor/AdminAddAuthor";
import AdminAddBook from "../AdminAddBook/AdminAddBook";
import AdminAddCategory from "../AdminAddCategory/AdminAddCategory";
import AdminIssueNewBook from "../AdminIssueNewBook/AdminIssueNewBook";
import AdminEditCategory from "../AdminEditCategory/AdminEditCategory";
import AdminEditAuthor from "../AdminEditAuthor/AdminEditAuthor";
import AdminEditBook from "../AdminEditBook/AdminEditBook";
import Home from "../Home/Home";
import ChangeBookPicture from "../ChangeBookPicture/ChangeBookPicture";
import AdminManageStudentsDetails from "../AdminManageStudentsDetails/AdminManageStudentsDetails";
import AdminUpdateIssuedBookDetails from "../AdminUpdateIssuedBookDetails/AdminUpdateIssuedBookDetails";
import ChangePassword from "../ChangePassword/ChangePassword";

const DefaultLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/UserIssuedBook" element={<UserIssuedBook />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/BookListed" element={<BookListed />} />
          <Route path="/BookNotReturn" element={<BookNotReturn />} />

          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminManageBooks" element={<AdminManageBooks />} />
          <Route
            path="/AdminManageIssuedBooks"
            element={<AdminManageIssuedBooks />}
          />
          <Route
            path="/AdminManageRegStudent"
            element={<AdminManageRegStudent />}
          />
          <Route path="/AdminManageAuthors" element={<AdminManageAuthors />} />
          <Route
            path="/AdminManageCategories"
            element={<AdminManageCategories />}
          />
          <Route path="/AdminAddCategory" element={<AdminAddCategory />} />
          <Route path="/AdminAddAuthor" element={<AdminAddAuthor />} />
          <Route path="/AdminAddBook" element={<AdminAddBook />} />
          <Route path="/AdminIssueNewBook" element={<AdminIssueNewBook />} />
          <Route path="/AdminEditCategory" element={<AdminEditCategory />} />
          <Route path="/AdminEditAuthor" element={<AdminEditAuthor />} />
          <Route path="/AdminEditBook" element={<AdminEditBook />} />
          <Route path="/ChangeBookPicture" element={<ChangeBookPicture />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route
            path="/AdminUpdateIssuedBookDetails"
            element={<AdminUpdateIssuedBookDetails />}
          />
          <Route
            path="/AdminManageStudentsDetails"
            element={<AdminManageStudentsDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default DefaultLayout;
