"use client";
import "./custom.scss";
import CentralData from "./Context/Context";
import React, { useEffect, useState } from "react";
import Loading from "./component/Loading/Loading";
import DefaultLayout from "./component/DefaultLayout/DefaultLayout";

const page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {" "}
      {!loading ? (
        <CentralData>
          <DefaultLayout />
        </CentralData>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default page;
