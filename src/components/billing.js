import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const Billing = () => {
  const initialValues = {
    accountnumber: "",
    routing: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };
  const location = useLocation();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const history = useHistory();

  const loginButtonClicked = () => {
    let path = "/login";
    history.push(path);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      formValues.accountnumber &&
      formValues.routing &&
      formValues.address &&
      formValues.city &&
      formValues.state &&
      formValues.zipcode
    ) {
      saveUserData(formValues, location.state.page1, location.state.page2);
      loginButtonClicked();
    }
  };

  const saveUserData = (formValues, newuser, company) => {
    const reqbody = {
      firstName: newuser.firstName,
      lastName: newuser.lastName,
      email: newuser.email,
      password: newuser.password,
      phoneNumber: newuser.phonenumber,
      securityQuestions: {
        schoolName: newuser.schoolName,
        bornCity: newuser.bornCity,
      },
      companyInformation: {
        companyName: company.organization,
        companyPhNumber: company.companyNumber,
        companycurrentAddress: {
          street: company.comaddress,
          city: company.comcity,
          state: company.comstate,
          zipcode: company.comzipcode,
        },
      },
      billingInformation: {
        achRoutingNumber: formValues.routing,
        achAccountNumber: formValues.accountnumber,
        BillingAddress: {
          street: formValues.address,
          city: formValues.city,
          state: formValues.state,
          zipcode: formValues.zipcode,
        },
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/user/save/`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify(reqbody),
    })
      .then((response) => response.json())
      .then((dt) => {
        if (dt) console.log("Saved  Successfully");
        else {
          console.log("......");
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  const validate = (values) => {
    const error = {};

    if (!values.accountnumber) {
      error.accountnumber = "Organization is required";
    }
    if (!values.routing) {
      error.routing = "CompanyNumber is required";
    }
    if (!values.address) {
      error.address = "Address is required";
    }
    if (!values.city) {
      error.city = "City is required";
    }
    if (!values.state) {
      error.state = "State is required";
    }
    if (!values.zipcode) {
      error.zipcode = "zipcode is required";
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
              <div className="from_field">
                <label htmlFor="routing" className="label">
                  ACH Routing Number
                </label>
                <input
                  id="routing"
                  className="input_filed"
                  type="number"
                  name="routing"
                  value={formValues.routing}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.routing}</p>
              </div>
              <div className="from_field">
                <label htmlFor="accountnumber" className="label">
                  ACH Account Number
                </label>
                <input
                  id="accountnumber"
                  className="input_filed"
                  type="number"
                  name="accountnumber"
                  value={formValues.accountnumber}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.accountnumber}</p>
              </div>
              <div className="from_field"></div>
              <div className="from_field">
                <p>Billing Address</p>
              </div>
              <div className="from_field m-0">
                <label htmlFor="address" className="label">
                  Street Address
                </label>
                <input
                  id="address"
                  className="input_filed"
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.address}</p>
              </div>
              <div className="from_field">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  id="city"
                  className="input_filed"
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.city}</p>
              </div>
              <div className="catogory">
                <div className="from_field added">
                  <label htmlFor="state" className="label">
                    State
                  </label>
                  <input
                    id="state"
                    className="input_filed"
                    type="text"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                  />
                  <p className="error">{formErrors.state}</p>
                </div>
                <div className="from_field">
                  <label htmlFor="zipcode" className="label">
                    Zip Code
                  </label>
                  <input
                    id="zipcode"
                    className="input_filed"
                    type="number"
                    name="zipcode"
                    value={formValues.zipcode}
                    onChange={handleChange}
                  />
                  <p className="error">{formErrors.zipcode}</p>
                </div>
              </div>
            </div>
            <div className="logo_con">
              <div className="nextPage_btnSec">
                <img src={logo} alt="logo" />
                <p>Construction made simple.</p>
                <input className="btn" type="submit" value="Submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};
export default Billing;
