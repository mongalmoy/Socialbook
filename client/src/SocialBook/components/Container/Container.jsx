import "./Container.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import Feed from "../../pages/Feed";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <>
      <div className="container_box">
        <Header />
        <Outlet />
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
