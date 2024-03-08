import "./Container.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import Header from "../Header/Header";
import Feed from "../../pages/Feed";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <>
      <div className="container_box">
        <Header />
        <div className="container_body_container">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Container;
