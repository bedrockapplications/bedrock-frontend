import React, { useState } from 'react';
import plus from "../Images/Plus.png"
import { useHistory } from "react-router-dom";
import DashboardHeader from './dashboard_header';
import DashboardLeft from './dashboard_left';

const CreateProject = (props) => {
  const userName = localStorage.getItem("userName");

  const initialValues = {
    projectName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    date: "",
    document: "",
    bluePrint: "",
    photo: "",
  };
  //   const location = useLocation();
  //   console.log(location);

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const history = useHistory();

  const loginButtonClicked = () => {
    let path = "/projectDirectory";
    history.push(path);
    props.setSelectedImage(selectedImage);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log("values", formValues);
    if (
      formValues.project &&
      formValues.phoneNumber &&
      formValues.address &&
      formValues.city &&
      formValues.state &&
      formValues.zipcode &&
      formValues.date &&
      fileName !== "Upload Image" &&
      bluePrintName !== "Upload Blueprint" &&
      docName !== "Upload Document"
    ) {
      formValues["photo"] = file;
      formValues["bluePrint"] = bluePrint;
      formValues["document"] = doc;
      saveProjectData(formValues);
      loginButtonClicked();
      // setSelectedImage(file);
    }
  };


  const saveProjectData = (formValues) => {
    var formdata = new FormData();
    formdata.append("projectName", formValues.project);
    formdata.append("ClientPhNumber", formValues.phoneNumber);
    formdata.append("Address", formValues.address);
    formdata.append("City", formValues.city);
    formdata.append("State", formValues.state);
    formdata.append("Zipcode", formValues.zipcode);
    formdata.append("StartDate", formValues.date);
    file.forEach((x) => {
      formdata.append("Photos", x);
    });
    bluePrint.forEach((x) => {
      formdata.append("Blueprints", x);
    });
    doc.forEach((x) => {
      formdata.append("Documents", x);
    });
    fetch("http://localhost:3000/api/project/upload/", {
      method: "POST",
      body: formdata,
    })
      .then((response) => response.json())
      .then((dt) => {
        if (!dt.message) {
          console.log("previous ", dt);
          dt._photos=[];
          dt._photos.push(selectedImage);
          props.saveProjectData(dt);
          console.log("the data is ", dt);
        } else {
          console.log("......"); // need to show the error msg;
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  const validate = (values) => {
    // alert("hii");
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
    if (fileName === "Upload Image") {
      error.photo = "Please choose an Image";
      document.getElementById("imageUpload").style.display = "block";
    } else {
      document.getElementById("imageUpload").style.display = "none";
    }
    if (docName === "Upload Document") {
      error.document = "Please choose a Document";
      document.getElementById("docUpload").style.display = "block";
    } else {
      document.getElementById("docUpload").style.display = "none";
    }
    if (bluePrintName === "Upload Blueprint") {
      error.bluePrint = "Please choose a Blue Print";
      document.getElementById("fileUpload").style.display = "block";
    } else {
      document.getElementById("fileUpload").style.display = "none";
    }

    if (!values.city && !values.state && values.zipcode) {
      error.threeFiledcity = "Enter the city and state";
    } else if (values.city && !values.state && !values.zipcode) {
      error.threeFiledcity = "Enter the state and zipcode";
    } else if (!values.city && values.state && !values.zipcode) {
      error.threeFiledcity = "Enter the city and zipcode";
    } else if (!values.city && values.state && values.zipcode) {
      error.threeFiledcity = "Enter the city field";
    } else if (values.city && !values.state && values.zipcode) {
      error.threeFiledcity = "Enter the state field";
    } else if (values.city && values.state && !values.zipcode) {
      error.threeFiledcity = "Enter the zipcode field";
    } else if (!values.city && !values.state && !values.zipcode) {
      error.threeFiledcity = "Enter the fields";
    } else {
      error.threeFiledcity = "";
    }

    if (!values.acreage && !values.bulidsplit && values.concretesplit) {
      error.threeAcreage = "Enter the acreage and bulidsplit";
    } else if (values.acreage && !values.bulidsplit && !values.bulidsplit) {
      error.threeAcreage = "Enter the bulidsplit and concretesplit";
    } else if (!values.acreage && values.bulidsplit && !values.concretesplit) {
      error.threeAcreage = "Enter the acreage and concretesplit";
    } else if (!values.acreage && values.bulidsplit && values.concretesplit) {
      error.threeAcreage = "Enter the acreage field";
    } else if (values.acreage && !values.bulidsplit && values.concretesplit) {
      error.threeAcreage = "Enter the bulidsplit field";
    } else if (values.acreage && values.bulidsplit && !values.concretesplit) {
      error.threeAcreage = "Enter the concretesplit field";
    } else if (!values.acreage && !values.bulidsplit && !values.concretesplit) {
      error.threeAcreage = "Enter the fields";
    } else {
      error.threeAcreage = "";
    }

    if (!values.date) {
      error.date = "Date is required";
    }

    return error;
  };

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Upload Image");
  const [bluePrint, setBluePrint] = useState([]);
  const [bluePrintName, setBluePrintName] = useState("Upload Blueprint");
  const [doc, setdoc] = useState([]);
  const [docName, setDocName] = useState("Upload Document");

  // props.testing(dataStore);
  const [selectedImage, setSelectImage] = useState(null);
  const handleselectedFile = (event) => {
    const files = event.target.files;
    const files_one = event.target.files[0];
    // setSelectedImage(files_one);
    setSelectImage(files_one);
    const tempArr = [];
    [...event.target.files].forEach((file) => {
      tempArr.push(file);
    });
    setFile(tempArr);
    setFileName(
      files.length > 1
        ? files.length + " images has been selected"
        : files[0].name
    );
  };

  const handleselectedDocFile = (event) => {
    const files = event.target.files;
    const tempArr = [];
    [...event.target.files].forEach((file) => {
      tempArr.push(file);
    });
    setdoc(tempArr);
    setDocName(
      files.length > 1
        ? files.length + " documents has been selected"
        : files[0].name
    );
  };

  const handleselectedBlueFile = (event) => {
    const files = event.target.files;
    const tempArr = [];
    [...event.target.files].forEach((file) => {
      tempArr.push(file);
    });
    setBluePrint(tempArr);
    setBluePrintName(
      files.length > 1
        ? files.length + " blueprints has been selected"
        : files[0].name
    );
  };


  


  return (
    <div className="primary_container">
      <div className="dashboard_page d_flex ">
        <div className="left_side">
          <DashboardLeft />
        </div>
        <div className="right_side">
          <div className="main_sec d_flex">
            <div className="header_con d_flex">
              <DashboardHeader userName={userName} />
            </div>
            <form
              className="create_con d_flex"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              id='my-node'
            >
              <div className="form_sec">
                <h1>Project Information.</h1>
                {/* <form className="form"> */}
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
                        type="text"
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
                        <label htmlFor="date" className="label">
                          Start Date
                        </label>
                        <input
                          id="date"
                          className="input_filed"
                          type="text"
                          placeholder="MM/DD/YYYY"
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
                {/* </form> */}
              </div>
              
              <div className="upload_sec d_flex">
                <div className="upload_card background_blue d_flex">
                  <img src={plus} alt="projectDir" />
                  <input
                    class="file-upload-input"
                    id="file_typeImg"
                    type="file"
                    title='Select Image'
                    name="photo"
                    multiple
                    value={formValues.photo}
                    onChange={handleselectedFile}
                  />
                  <label for="file_typeImg">
                    <span>{fileName}</span>
                  </label>
                  <span>Formats accepted HEIC,JPEG,PNG </span>
                  <span className="tooltip" id="imageUpload">
                    {formErrors.photo}
                  </span>
                </div>
                <div className="upload_card background_blue d_flex">
                  <img src={plus} alt="projectDir" />
                  <input
                    class="file-upload-input"
                    id="file_typeblueprint"
                    type="file"
                    title='Select PDF'
                    name="bluePrint"
                    multiple
                    value={formValues.bluePrint}
                    onChange={handleselectedBlueFile}
                  />
                  <label for="file_typeblueprint">
                    <span>{bluePrintName}</span>
                  </label>
                  <span>Formats accepted PDF,Docs</span>
                  <span className="tooltip" id="fileUpload">
                    {formErrors.bluePrint}
                  </span>
                </div>

                <div className="upload_card background_blue d_flex">
                  <img src={plus} alt="projectDir" />
                  <input
                    class="file-upload-input"
                    id="file_typedoc"
                    type="file"
                    title='Select PDF'
                    name="document"
                    multiple
                    value={formValues.document}
                    onChange={handleselectedDocFile}
                  />
                  <label for="file_typedoc">
                    <span>{docName}</span>
                  </label>
                  <span>Formats accepted PDF, Docs</span>
                  <span className="tooltip" id="docUpload">
                    {formErrors.document}
                  </span>
                </div>
              </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProject;