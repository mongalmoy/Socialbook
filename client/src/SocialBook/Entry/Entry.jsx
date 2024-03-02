import { useState } from "react";
import "./Entry.css";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apis } from "../service/constant";
import Loader from "../components/Loader/Loader";
import { formInfoSchema } from "../Data/Entry/entryPageData";

const Entry = ({ page }) => {
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState(formInfoSchema);
  const [errors, setErrors] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  console.log("formInfo", formInfo);
  console.log("errors", errors);

  function resetFormInfo() {
    setFormInfo({ ...formInfoSchema });
  }

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

  console.log(showLoader);

  async function doPOST(endpoint) {
    const response = await fetch(apis.baseUrl + endpoint, {
      method: "POST",
      body: JSON.stringify(formInfo),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const resJosn = await response.json();
    return resJosn;
  }

  async function doRegister(e) {
    e.preventDefault();

    setShowLoader(true);
    const registerRes = await doPOST("register");
    setShowLoader(false);

    if (registerRes.retrunStr === "error") {
      toast.warning(registerRes?.actions?.errorMsg);
    } else {
      toast.success(registerRes?.actions?.successMsg);
      navigate("/feed");
    }
  }

  async function doLogin(e) {
    e.preventDefault();

    setShowLoader(true);
    const loginRes = await doPOST("login");
    setShowLoader(false);

    if (loginRes.retrunStr === "error") {
      toast.warning(loginRes?.actions?.errorMsg);
    } else {
      toast.success(loginRes?.actions?.successMsg);
      sessionStorage.setItem("jwt", loginRes.responseBody?.jwt || "")
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
              <Form onSubmit={page === "login" ? doLogin : doRegister}>
                <div className="register-form" style={{ width: "400px" }}>
                  <div className="heading-div">
                    <h1>{page === "login" ? "Login" : "Register"} Here</h1>
                  </div>

                  {page === "login" ? null : (
                    <>
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
                    </>
                  )}

                  <div className="input-email" style={{ display: "flex" }}>
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      required
                      onChange={(e) => handleChangeInput(e)}
                      value={formInfo.email}
                    />

                    {page === "login" ? null : (
                      <>
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
                      </>
                    )}
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
                    {showLoader ? (
                      <button className="primary_btn spinner_btn px-3">
                        <Spinner
                          size="sm"
                          animation="border"
                          variant="light"
                          className="me-2"
                        />
                        Fetching...
                      </button>
                    ) : (
                      <button className="primary_btn" type="submit">
                        {page === "login" ? "Login" : "Register"}
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
            <div className="convert-div">
              <p>
                {page === "login"
                  ? "Create an account"
                  : "Already have an account?"}
                <b
                  className="ms-2"
                  onClick={() => {
                    resetFormInfo();
                    if (page === "login") navigate("/register");
                    else navigate("/login");
                  }}
                >
                  {page === "login" ? "Register" : "Login"}
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
      {/* {showLoader ? <Loader /> : null} */}
    </div>
  );
};

export default Entry;
