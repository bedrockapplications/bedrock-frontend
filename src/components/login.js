import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [successtext, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const history = useHistory();
  const loginButtonClicked = () => {
    let path = "/dashboard";
    history.push({
      pathname: path
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = validate(formValues);
    setFormErrors(validation);
    if (
      formValues.email &&
      formValues.password &&
      Object.keys(validation).length === 0
    ) {
      PostApi(formValues.email, formValues.password);

    }
  };
  function setColor(color) {
    document.documentElement.style.setProperty("--color-success", color);
  }

  const PostApi = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dt) => {
        if (!dt.message) {
          setSuccess("Logged in Successfully");
          getUserDetails(email);
        }
        else {
          setSuccess(dt.message);
          setColor("rgb(192, 62, 62)");
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  const getUserDetails = async (email) => {
    return fetch("http://localhost:3000/api/user/details?email=" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dt) => {
        if (dt.message) {
          return dt.message;
        } else {
          let userFirstName = dt.firstName;
          let uname = dt.firstName + " " + dt.lastName;
          localStorage.setItem("userName", uname);
          localStorage.setItem("userFirstName", userFirstName);
          loginButtonClicked();
        }
      });
  };

  const validate = (values) => {
    const error = {};
    const regex = /^([a-zA-Z0-9~!@#$%^&*=-])+\@[a-z]+\.[a-z]+$/;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid Email format";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 8) {
      error.password = "Password must be more than 8 characters";
    } else if (values.password.length > 16) {
      error.password = "Password cannot exceed more than 15";
    }
    return error;
  };

  return (
    <>
      <Header />
      <div className="login_container">
        <div className="login_sec">
          <div className="form_con">
            <h1>Welcome Back!</h1>
            <form className="form" onSubmit={handleSubmit}>
              <div className="from_field">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  className="input_filed"
                  type="text"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.email}</p>
              </div>
              <div className="from_field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="email"
                  name="password"
                  className="input_filed"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.password}</p>
              </div>
              <div className="success">
                <p>{successtext}</p>
              </div>
              <div className="from_field">
                <input
                  id="submit"
                  className="btn"
                  type="submit"
                  value="Login"
                />
              </div>
              <div className="from_field m-0">
                <p className="sublink">
                  Forgot Password?&nbsp;
                  <Link to="/forgotpassword" className="nextink">
                    Click Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="logo_con">
            <div className="nextPage_btnSec">
              <img src={logo} alt="logo" />
              <p>Construction made simple.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
