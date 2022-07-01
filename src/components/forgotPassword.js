import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const ForgotPassword = () => {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isValid, setValid] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const history = useHistory();

  const loginButtonClicked = () => {
    let path = "/resetpassword";
    history.push(path);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = validate(formValues);
    setFormErrors(validation);
    if (
      formValues.email &&
      formValues.schoolName &&
      formValues.bornCity &&
      Object.keys(validation).length === 0
    ) {
      let scheck = await SecurityValidation(
        formValues.email,
        formValues.schoolName,
        formValues.bornCity
      );
      if (scheck === "valid") {
        loginButtonClicked();
      }
    }
  };

  const SecurityValidation = async (email, schname, brncty) => {
    return fetch(
      "http://localhost:3000/security/check?email=" +
        email +
        "&schoolName=" +
        schname +
        "&bornCity=" +
        brncty,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((dt) => {
        if (dt.message) {
          setValid(dt.message);
          document.documentElement.style.setProperty(
            "--color-success",
            "rgb(192, 62, 62)"
          );
          return dt.message;
        } else {
          return dt.success;
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
    if (!values.schoolName) {
      error.schoolName = "This field is required";
    }
    if (!values.bornCity) {
      error.bornCity = "This field is required";
    }
    return error;
  };

  return (
    <>
    <Header/>
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
                  className="input_filed"
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.email}</p>
              </div>
              <div className="from_field">
                <p>Security Questions</p>
              </div>
              <div className="from_field m-0">
                <label htmlFor="schoolName" className="label">
                  What high school did you attend?
                </label>
                <input
                  id="schoolName"
                  className="input_filed"
                  type="text"
                  name="schoolName"
                  value={formValues.schoolName}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.schoolName}</p>
              </div>
              <div className="from_field">
                <label htmlFor="bornCity" className="label">
                  What city were you born in?
                </label>
                <input
                  id="bornCity"
                  className="input_filed"
                  type="text"
                  name="bornCity"
                  value={formValues.bornCity}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.bornCity}</p>
              </div>
              <div className="success">
                <p>{isValid}</p>
              </div>
              <div className="from_field">
                <input
                  id="submit"
                  className="btn"
                  type="submit"
                  value="Reset Password"
                />
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
      <Footer/>
    </>
  );
};
export default ForgotPassword;
