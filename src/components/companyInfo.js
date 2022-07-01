import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../Images/Bedrock Rock .png";
import Footer from "./footer";
import Header from "./header";

const CompanyInfo = () => {
  const initialValues1 = {
    organization: "",
    companyNumber: "",
    comaddress: "",
    comcity: "",
    comstate: "",
    comzipcode: "",
  };
  const location = useLocation();
  const [formValues, setFormValues] = useState(initialValues1);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const history = useHistory();
  const loginButtonClicked = () => {
    let path = "/billing";
    history.push({
      pathname: path,
      state: { page1: location.state.page1, page2: formValues },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      formValues.organization &&
      formValues.companyNumber &&
      formValues.comaddress &&
      formValues.comcity &&
      formValues.comstate &&
      formValues.comzipcode
    ) {
      loginButtonClicked();
    }
  };

  const validate = (values) => {
    const error = {};

    if (!values.organization) {
      error.organization = "Organization is required";
    }
    if (!values.companyNumber) {
      error.companyNumber = "CompanyNumber is required";
    }
    if (!values.comaddress) {
      error.comaddress = "Address is required";
    }
    if (!values.comcity) {
      error.comcity = "City is required";
    }
    if (!values.comstate) {
      error.comstate = "State is required";
    }
    if (!values.comzipcode) {
      error.comzipcode = "zipcode is required";
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
                <label htmlFor="organization" className="label">
                  Name of Organization
                </label>
                <input
                  id="organization"
                  className="input_filed"
                  type="text"
                  name="organization"
                  value={formValues.organization}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.organization}</p>
              </div>
              <div className="from_field">
                <label htmlFor="companyNumber" className="label">
                  Company Phone Number
                </label>
                <input
                  id="companyNumber"
                  className="input_filed"
                  type="number"
                  name="companyNumber"
                  value={formValues.companyNumber}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.companyNumber}</p>
              </div>
              <div className="from_field"></div>
              <div className="from_field">
                <p>Current Address</p>
              </div>
              <div className="from_field m-0">
                <label htmlFor="address" className="label">
                  Street Address
                </label>
                <input
                  id="comaddress"
                  className="input_filed"
                  type="text"
                  name="comaddress"
                  value={formValues.comaddress}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.comaddress}</p>
              </div>
              <div className="from_field">
                <label htmlFor="comcity" className="label">
                  City
                </label>
                <input
                  id="comcity"
                  className="input_filed"
                  type="text"
                  name="comcity"
                  value={formValues.comcity}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.comcity}</p>
              </div>
              <div className="catogory">
                <div className="from_field added">
                  <label htmlFor="comstate" className="label">
                    State
                  </label>
                  <input
                    id="comstate"
                    className="input_filed"
                    type="text"
                    name="comstate"
                    value={formValues.comstate}
                    onChange={handleChange}
                  />
                  <p className="error">{formErrors.comstate}</p>
                </div>
                <div className="from_field">
                  <label htmlFor="comzipcode" className="label">
                    Zip Code
                  </label>
                  <input
                    id="comzipcode"
                    className="input_filed"
                    type="number"
                    name="comzipcode"
                    value={formValues.comzipcode}
                    onChange={handleChange}
                  />
                  <p className="error">{formErrors.comzipcode}</p>
                </div>
              </div>
            </div>
            <div className="logo_con">
              <div className="nextPage_btnSec">
                <img src={logo} alt="logo" />
                <p>Construction made simple.</p>

                <input
                  className="btn"
                  type="submit"
                  value="  Next Page (Billing Information)
                                "
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};
export default CompanyInfo;
