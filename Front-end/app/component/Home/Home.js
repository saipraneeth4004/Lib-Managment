"use client";
import React, { useContext, useState } from "react";
import "bootstrap";
import Navbar from "../Navbar/Navbar";
import { CentralizedData } from "@/app/Context/Context";

const Home = () => {
  const [auth, setAuth, admin, setAdmin] = useContext(CentralizedData);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Carousel Start */}
      <div className="container-fluid p-0 mb-5">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://assets.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://3.bp.blogspot.com/-IWM0_Rp9GLc/W3wtaA1MQJI/AAAAAAAAHYY/gTuPl8DeEmYfaHOLcluA2mgsPrZp82NywCLcBGAs/s1600/Library.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/tgam/TWOHC37A35OYBA5ZSIX74MI46I.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{
                minHeight: 400,
                visibility: "visible",
                animationDelay: "0.1s",
                animationName: "fadeInUp",
              }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/tgam/TWOHC37A35OYBA5ZSIX74MI46I.jpg"
                  alt="image not available"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.3s"
              style={{
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp",
              }}
            >
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">Welcome to Library Management System</h1>
              <p className="mb-4">
              Library management system is a project which aims in developing a computerized system to maintain all the daily work of library .This project has many features which are generally not available in normal library management systems like facility of user login and a facility of admin login .It also has a facility of admin login through which the admin can monitor the whole system . It has also a facility where student after logging in their accounts can see list of books issued and its issue date and return date.
</p>
              <p className="mb-4">
              Overall, this project of ours is being developed to help the students as well as staff of library to maintain the library in the best way possible and also reduce the human efforts.
</p>

<p className="mb-4">
              Technologies Used - 
</p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    React JS
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Node JS
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    Next JS
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2" />
                    MongoDB
                  </p>
                </div>
                
                
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="#">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer  mt-2 wow fadeIn"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
        }}
      >
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <a className="border-bottom" href="#">
                  Library Management Syatem
                </a>
                , All Right Reserved.
                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                
                
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a>Home</a>
                  <a>Cookies</a>
                  <a href="#">Help</a>
                  <a href="#">FQAs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
