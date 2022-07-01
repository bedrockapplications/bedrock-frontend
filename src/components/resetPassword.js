import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const ResetPassword = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmpwd: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [resetText, setResetText] = useState("");

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const history = useHistory();

  const loginButtonClicked = () => {
    let path = "/login";
    history.push(path);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = validate(formValues);
    setFormErrors(validation);
    if (
      formValues.email &&
      formValues.password &&
      formValues.confirmpwd &&
      Object.keys(validation).length === 0
    ) {
      let data = await ResetPassword(formValues.email, formValues.password);
      if (data.success) loginButtonClicked();
    }
  };

  const ResetPassword = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    return fetch("http://localhost:3000/resetpassword/", {
      method: "PUT",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dt) => {
        if (dt.message) {
          setResetText(dt.message);
          document.documentElement.style.setProperty(
            "--color-success",
            "rgb(192, 62, 62)"
          );
        }

        return dt;
      })
      .catch((error) => {
        console.log("error is ", error);
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
    }
    if (!values.confirmpwd) {
      error.confirmpwd = "Password is required";
    }
    if (values.password !== values.confirmpwd) {
      error.confirmpwd = "Password does not match";
    }
    return error;
  };

  return (
    <>
  <Header/>
      <div className="login_container">
        <div className="login_sec">
          <div className="form_con">
            <h1>Reset Your Password</h1>
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
                <label htmlFor="password" className="label">
                  New Password
                </label>
                <input
                  id="password"
                  className="input_filed"
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.password}</p>
              </div>
              <div className="from_field">
                <label htmlFor="confirmpwd" className="label">
                  Confirm New Password
                </label>
                <input
                  id="confirmpwd"
                  className="input_filed"
                  type="password"
                  name="confirmpwd"
                  value={formValues.confirmpwd}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.confirmpwd}</p>
              </div>
              <div className="success">
                <p>{resetText}</p>
              </div>
              <div className="from_field">
                <input className="btn" type="submit" value="Reset Password" />
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
export default ResetPassword;
