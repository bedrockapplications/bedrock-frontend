import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const NewUser = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    password: "",
    schoolName: "",
    bornCity: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [emailText, setEmailText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const history = useHistory();
  const loginButtonClicked = () => {
    let path = "/companyinfo";
    history.push({
      pathname: path,
      state: { page1: formValues },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = validate(formValues);
    setFormErrors(validation);
    if (
      formValues.firstName &&
      formValues.email &&
      formValues.password &&
      formValues.schoolName &&
      formValues.bornCity &&
      Object.keys(validation).length === 0
    ) {
      let exists = await getUserEmail(formValues.email);
      if (exists === "done") loginButtonClicked();
    }
  };

  const getUserEmail = async (email) => {
    return fetch("http://54.88.168.1:3000/api/user/finduser?email=" + email, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dt) => {
        if (dt.message) {
          setEmailText(dt.message);
          document.documentElement.style.setProperty(
            "--color-success",
            "rgb(192, 62, 62)"
          );
          return dt.message;
        } else return dt.success;
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
    if (!values.firstName) {
      error.firstName = "First name is required";
    }

    if (!values.phonenumber) {
      error.phonenumber = "Phone number is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 8) {
      error.password = "Password must be more than 8 characters";
    } else if (values.password.length > 16) {
      error.password = "Password cannot exceed more than 15";
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
        <form className="form" onSubmit={handleSubmit}>
          <div className="login_sec">
            <div className="form_container">
              <h1>New User Onboarding.</h1>

              <div className="catogory">
                <div className="from_field added">
                  <label htmlFor="firstName" className="label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="input_filed"
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                  />
                  <p className="error">{formErrors.firstName}</p>
                </div>
                <div className="from_field">
                  <label htmlFor="lastName" className="label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="input_filed"
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                  />
                  {/* <p className="error">{formErrors.lastName}</p> */}
                </div>
              </div>

              <div className="from_field">
                <label htmlFor="email" className="label">
                  Work Email Address
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
                <label htmlFor="phonenumber" className="label">
                  Work Phone Number
                </label>
                <input
                  id="phonenumber"
                  className="input_filed"
                  type="number"
                  name="phonenumber"
                  value={formValues.phonenumber}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.phonenumber}</p>
              </div>
              <div className="from_field">
                <label htmlFor="password" className="label">
                  Password
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
                <p>Security Questions</p>
              </div>
              <div className="from_field m-0">
                <label htmlFor="schoolName" className="label">
                  What high school did you attend?
                </label>
                <input
                  id="schoolName"
                  className="input_filed"
                  name="schoolName"
                  value={formValues.schoolName}
                  onChange={handleChange}
                  type="text"
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
                  name="bornCity"
                  value={formValues.bornCity}
                  onChange={handleChange}
                  type="text"
                />
                <p className="error">{formErrors.bornCity}</p>
              </div>
            </div>
            <div className="logo_con">
              <div className="nextPage_btnSec">
                <img src={logo} alt="logo" />
                <p>Construction made simple.</p>
                <input
                  className="btn"
                  type="submit"
                  value="  Next Page (Company Information)"
                />
                <div className="success">
                  <p>{emailText}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};
export default NewUser;
