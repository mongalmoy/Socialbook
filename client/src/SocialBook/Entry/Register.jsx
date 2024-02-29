import { useState } from "react";
import "./Entry.css";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apis } from "../service/constant";

const Register = () => {
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  console.log("formInfo", formInfo);
  console.log("errors", errors);

  const validateEmail = (email) => {
    console.log(
      email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
    );
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formInfo);
    const submitDetails = await fetch(apis.baseUrl + "/register", {
      method: "POST",
      body: JSON.stringify(formInfo),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const submitDetailsRes = await submitDetails.json();

    console.log(submitDetailsRes);
    if (submitDetailsRes.retrunStr === "error") {
      toast.warning(submitDetailsRes?.actions?.errorMsg);
    } else {
      toast.success(submitDetailsRes?.actions?.successMsg);
      navigate("/feed");
    }
  }

  function handleChangeInput(e) {
    setFormInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="register-page">
      <Row>
        <Col lg={5} md={5} sm={5} className="flexbox flex-d-col">
          <div className="left-div">
            <div className="name">
              <p>JOIN US</p>
            </div>
            <div className="welcome">
              <p>Welcome to Jolu Book !</p>
            </div>
            <div className="about-us">
              <b onClick={() => navigate("/about")}>About Us</b>
            </div>
          </div>
        </Col>

        <Col className="flexbox flex-d-col">
          <div className="right-div">
            <div className="form-div">
              <Form onSubmit={handleSubmit}>
                <div className="register-form" style={{ width: "400px" }}>
                  <div className="heading-div">
                    <h1>Register Here</h1>
                  </div>
                  <div className="input-email flexbox">
                    <input
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      className="me-1"
                      required
                      minLength={1}
                      maxLength={12}
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.firstName}
                    />
                    <input
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      className="ms-1"
                      required
                      minLength={0}
                      maxLength={12}
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.lastName}
                    />
                  </div>
                  <div className="input-email">
                    <input
                      placeholder="Username"
                      type="text"
                      name="username"
                      required
                      minLength={6}
                      maxLength={12}
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.username}
                    />
                  </div>
                  <div className="input-email" style={{ display: "flex" }}>
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      required
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.email}
                    />
                    <span
                      id="registerPageVerifyButton"
                      onClick={
                        null // otpPopup
                      }
                    >
                      Verify
                    </span>
                    <div className="verified">
                      <svg
                        style={{ fill: "green", marginLeft: "10px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      <span>verified</span>
                    </div>
                  </div>
                  <div className="input-password">
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      minLength={6}
                      required
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.password}
                    />
                  </div>
                  <div className="align_right">
                    <button className="primary_btn" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            </div>
            <div className="convert-div">
              <p>
                Already have an account?{" "}
                <b className="ms-2" onClick={() => navigate("/login")}>
                  Login
                </b>
              </p>
            </div>
          </div>
        </Col>
      </Row>
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
    </div>
  );
};

export default Register;
