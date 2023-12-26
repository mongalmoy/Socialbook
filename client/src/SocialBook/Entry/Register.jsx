import "./Entry.css";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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
              <Form>
                <div className="register-form" style={{ width: "400px" }}>
                  <div className="heading-div">
                    <h1>Register Here</h1>
                  </div>
                  <div className="input-email">
                    <input
                      placeholder="Username"
                      type="email"
                      name="username"
                    />
                  </div>
                  <div className="input-email" style={{ display: "flex" }}>
                    <input
                      placeholder="Email"
                      type="email"
                      name="username"
                      required
                    />
                    <span id="registerPageVerifyButton" onclick="otpPopup()">
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
    </div>
  );
};

export default Register;
