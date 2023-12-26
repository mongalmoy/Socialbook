import "./Entry.css";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
                    <h1>Login Here</h1>
                  </div>
                  <div className="input-email">
                    <input
                      placeholder="Username"
                      type="email"
                      name="username"
                    />
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
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </div>

            <div className="convert-div">
              <p>
                Create an account
                <b className="ms-2" onClick={() => navigate("/register")}>
                  Register
                </b>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
