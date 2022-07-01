import React, { useState } from 'react';
import dotted_img from "../Images/Dotted Circles.png";
import logo_img from "../Images/Bedrock Black.png";
import employee from "../Images/employee.png";
import crane from "../Images/crane.png";
import cloud from "../Images/CLoud.png";
import notification from "../Images/notification.png";
import avatar from "../Images/avatar.png";
import plus from "../Images/Plus.png"
import { Link, useHistory, useLocation } from "react-router-dom";

const CreateProject = () => {

    const initialValues = {
        project: "",
        phoneNumber: "",
        address: "",
        city: "",
        zipcode: "",
        acreage: "",
        concretesplit: "",
        bulidsplit: "",
        date: "",
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
                schoolName: formValues.schoolName,
                bornCity: formValues.bornCity,
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
        console.log("final data", reqbody);
        fetch("http://localhost:3000/save/", {
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
                if (dt) alert("Saved  Successfully");
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

        
        if (!values.project) {
            error.project = "Project name is required";
        }
        if (!values.phoneNumber) {
            error.phoneNumber = "phone number is required";
        }
        if (!values.address) {
            error.address = "Address is required";
        }
       
        
        if(!values.city && !values.state && values.zipcode){
            error.threeFiledcity = "Enter the city and state";
        }
        else if(values.city && !values.state && !values.zipcode){
            error.threeFiledcity = "Enter the state and zipcode";
        }
        else if(!values.city && values.state && !values.zipcode){
            error.threeFiledcity = "Enter the city and zipcode";
        }
        else if(!values.city && values.state && values.zipcode){
            error.threeFiledcity = "Enter the city field";
        }
        else if(values.city && !values.state && values.zipcode){
            error.threeFiledcity = "Enter the state field";
        }
        else if(values.city && values.state && !values.zipcode){
            error.threeFiledcity = "Enter the zipcode field";
        }
        else {
            error.threeFiledcity = "Enter the fields";
        }


        if(!values.acreage && !values.bulidsplit && values.concretesplit){
            error.threeAcreage = "Enter the acreage and bulidsplit";
        }
        else if(values.acreage && !values.bulidsplit && !values.bulidsplit){
            error.threeAcreage = "Enter the bulidsplit and concretesplit";
        }
        else if(!values.acreage && values.bulidsplit && !values.concretesplit){
            error.threeAcreage = "Enter the acreage and concretesplit";
        }
        else if(!values.acreage && values.bulidsplit && values.concretesplit){
            error.threeAcreage = "Enter the acreage field";
        }
        else if(values.acreage && !values.bulidsplit && values.concretesplit){
            error.threeAcreage = "Enter the bulidsplit field";
        }
        else if(values.acreage && values.bulidsplit && !values.concretesplit){
            error.threeAcreage = "Enter the concretesplit field";
        }
        else {
            error.threeAcreage = "Enter the fields";
        }
       
        if (!values.date) {
            error.date = "Date is required";
        }
        return error;
    };
    const finputs = Array.from(
        document.getElementById('upload_card [type="file"]')
    );
    
    finputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            const path = e.target.value;
            const filenameField = e.target.parentElement.querySelector("span");
            const filename = path.split(/\/|\\/).pop();
            if (filename) filenameField.innerText = filename;
            else filenameField.innerText = "Upload Photo";
        });
    });



    return (
        <div className='primary_container'>
            <div className='dashboard_page d_flex '>
                <div className='left_side'>
                    <div className='dashboard'>
                        <div className='logo_img'>
                            <img src={logo_img} alt="logo_img" />
                        </div>
                        <div className='link_sec'>
                            <div className='link_menu'>
                                <div className='dotted d_flex'>
                                    <img src={dotted_img} alt="select" />
                                    <h3>Select Project</h3>
                                </div>
                                <ul>
                                    <li>
                                        <Link className='Link' to="dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='Link' to="projectDirectory">
                                            My Projects
                                        </Link>
                                    </li>
                                    <li>Schedule</li>
                                    <li>Tasks/Calendar</li>
                                    <li>Automated Take Off</li>
                                    <li>Document Manager</li>
                                    <li>Contact Directory</li>
                                    <li>5xtContracts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right_side'>
                    <div className='main_sec d_flex'>
                        <div className='header_con d_flex'>
                            <div>
                                <ul className='left_align d_flex'>
                                    <li>
                                        <p className='rounded'><span ></span> Good Morning</p>
                                        <p>23 June 2022 , 22:45:04</p>
                                    </li>
                                    <li>
                                        <p>English (US)</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='d_flex '>
                                <ul className='right_align d_flex'>
                                    <li>
                                        <p className='meeting'>Architect Meeting <span>in 1h 12m</span></p>
                                    </li>
                                    <li>
                                        <img className='notification_img' src={notification} alt='notification' />
                                    </li>
                                    <li>
                                        <p className='nameAvatar d_flex m-0'>Bob The Builder
                                            <span>
                                                <img className='avatar_img' src={avatar} alt="name" />
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='create_con d_flex'>
                            <div className='form_sec'>
                                <h1>Project Information.</h1>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="login_sec">
                                        <div className="form_container">
                                            <div className="from_field">
                                                <label htmlFor="project" className="label">
                                                    Name of Project
                                                </label>
                                                <input
                                                    id="project"
                                                    className="input_filed"
                                                    type="text"
                                                    name="project"
                                                    value={formValues.project}
                                                    onChange={handleChange}
                                                />
                                                <p className="error">{formErrors.project}</p>
                                            </div>
                                            <div className="from_field">
                                                <label htmlFor="phoneNumber" className="label">
                                                    Client Phone Number
                                                </label>
                                                <input
                                                    id="phoneNumber"
                                                    className="input_filed"
                                                    type="number"
                                                    name="phoneNumber"
                                                    value={formValues.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                                <p className="error">{formErrors.phoneNumber}</p>
                                            </div>
                                            <div className="from_field">
                                                <label htmlFor="address" className="label">
                                                    Address Line 1
                                                </label>
                                                <input
                                                    id="address"
                                                    className="input_filed"
                                                    type="number"
                                                    name="address"
                                                    value={formValues.address}
                                                    onChange={handleChange}
                                                />
                                                <p className="error">{formErrors.address}</p>
                                            </div>
                                            <div className="catogory d_flex">
                                                <div className="from_field">
                                                    <label htmlFor="city" className="label">
                                                        City
                                                    </label>
                                                    <input
                                                        id="city"
                                                        className="input_filed city"
                                                        type="text"
                                                        name="city"
                                                        value={formValues.city}
                                                        onChange={handleChange}
                                                    />
                                                  
                                                </div>
                                                <div className="from_field ">
                                                    <label htmlFor="state" className="label">
                                                        State
                                                    </label>
                                                    <input
                                                        id="state"
                                                        className="input_filed state"
                                                        type="text"
                                                        name="state"
                                                        value={formValues.state}
                                                        onChange={handleChange}
                                                    />
                                                    {/* <p className="error">{formErrors.comstate}</p> */}
                                                </div>
                                                <div className="from_field">
                                                    <label htmlFor="zipcode" className="label">
                                                        Zip Code
                                                    </label>
                                                    <input
                                                        id="zipcode"
                                                        className="input_filed city"
                                                        type="number"
                                                        name="zipcode"
                                                        value={formValues.zipcode}
                                                        onChange={handleChange}
                                                    />
                                                    {/* <p className="error">{formErrors.comzipcode}</p> */}
                                                </div>
                                                <p className="error">{formErrors.threeFiledcity}</p>
                                            </div>
                                            <div className="catogory d_flex">
                                                <div className="from_field">
                                                    <label htmlFor="acreage" className="label">
                                                        Acreage (ft)
                                                    </label>
                                                    <input
                                                        id="acreage"
                                                        className="input_filed"
                                                        type="text"
                                                        name="acreage"
                                                        value={formValues.acreage}
                                                        onChange={handleChange}
                                                    />
                                                  
                                                </div>
                                                <div className="from_field ">
                                                    <label htmlFor="bulidsplit" className="label">
                                                        Building Split
                                                    </label>
                                                    <input
                                                        id="bulidsplit"
                                                        className="input_filed"
                                                        type="text"
                                                        name="bulidsplit"
                                                        value={formValues.bulidsplit}
                                                        onChange={handleChange}
                                                    />
                                                    {/* <p className="error">{formErrors.comstate}</p> */}
                                                </div>
                                                <div className="from_field">
                                                    <label htmlFor="concretesplit" className="label">
                                                        Concrete Split
                                                    </label>
                                                    <input
                                                        id="concretesplit"
                                                        className="input_filed"
                                                        type="number"
                                                        name="concretesplit"
                                                        value={formValues.concretesplit}
                                                        onChange={handleChange}
                                                    />
                                                    {/* <p className="error">{formErrors.comzipcode}</p> */}
                                                </div>
                                                <p className="error">{formErrors.threeAcreage}</p>
                                            </div>
                                           
                                            <div className="catogory d_flex">
                                                <div className="from_field">
                                                    <label htmlFor="date" className="label">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        id="date"
                                                        className="input_filed"
                                                        type="text"
                                                        name="date"
                                                        value={formValues.date}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="error">{formErrors.date}</p>
                                                </div>
                                            </div>
                                            <div className="from_field">

                                                <input
                                                    className="btn"
                                                    type="submit"
                                                    value="Create Project"

                                                />
                                                {/* <p className="error">{formErrors.companyNumber}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='upload_sec d_flex'>
                                <div className='upload_card background_blue d_flex'>
                                    <img src={plus} alt="projectDir" />
                                    <label for="file_typeImg">
                                        <span>
                                        Upload Photo
                                        </span>
                                        </label>
                                    <span>Formats accepted HEIC,JPEG,PDF,PNG </span>
                                    <input class="file-upload-input" id='file_typeImg' type='file' onchange="readURL(this);" accept="image/*" />
                                </div>
                                <div className='upload_card background_blue d_flex'>
                                <input class="file-upload-input" id="file_typeblueprint"type='file' onchange="readURL(this);" accept="file/*" />
                                    <img src={plus} alt="projectDir" />
                                    <label for="file_typeblueprint">
                                    <span>Upload Blueprint</span>
                                    </label>
                                    <span>Formats accepted HEIC,JPEG,PDF,PNG</span>
                                   
                                </div>
                                <div className='upload_card background_blue d_flex'>
                                    <img src={plus} alt="projectDir" />
                                    <label for="file_typedoc">
                                    <span>Upload Documents</span></label>
                                    <span>Formats accepted HEIC,JPEG,PDF, &nbsp;PNG,Docs</span> 
                                    <input class="file-upload-input" id='file_typedoc' type='file' onchange="readURL(this);" accept="image/*" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateProject;