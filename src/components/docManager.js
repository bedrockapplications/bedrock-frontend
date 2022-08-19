import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard_header";
import DashboardLeft from "./dashboard_left";
import axios from 'axios';
import File__upload from "../Images/File upload.png";
import Folder_upload from "../Images/upload Folder.png";
import Plus from "../Images/Plus .png";
import search from "../Images/search.png";
import Photo_icon from "../Images/Photo.png";
import Mail_icon from "../Images/Mail.png";
import Jpeg_icon from "../Images/jpg.png";
import edit_icon from "../Images/edit.png";
import Trash_icon from "../Images/trash.png";
import CloudDownload_icon from "../Images/CloudDownload.png";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF", "PDF"];

const DocManager = () => {
    const userName = localStorage.getItem("userName");
    const initialValues = {
        fileDocument: "",
        folderDocument: "",
    };
    const [formErrors, setFormErrors] = useState({});

    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const handleUploadClick = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    }
    setTimeout(() => {
        if (toggle) {
            if (filedocName === "File Upload" && folderdocName === "Folder Upload") {
                document.getElementById("submitBtn").style.display = "none";
            }
            else {
                document.getElementById("submitBtn").style.display = "block";
            }
        }
    }, 1000);
    const validate = () => {
        const error = {};
        if (filedocName === "File Upload" && folderdocName === "Folder Upload") {
            error.folderDocument = "Please select a folder";
            document.getElementById("folderUpload").style.display = "block";

            error.fileDocument = "Please select a file";
            document.getElementById("fileUpload").style.display = "block";
        }
        else {
            document.getElementById("folderUpload").style.display = "none";
            document.getElementById("fileUpload").style.display = "none";
        }
        return error;
    };
    const retrieveContacts = async () => {
        const response = await axios.get("https://restcountries.com/v2/all");
        return response.data;
    }

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) {
                setData(allContacts);
            }
        };
        getAllContacts();
    }, []);

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const [filedocName, setFileDocName] = useState("File Upload");
    const [folderdocName, setFolderDocName] = useState("Folder Upload");
    const handleselectedDocFile = (event) => {
        const files = event.target.files;
        const tempArr = [];
        [...event.target.files].forEach((file) => {
            tempArr.push(file);
        });
        setFileDocName(
            files.length > 1
                ? files.length + " documents has been selected"
                : files[0].name
        );
    };
    const handleselectedDocFolder = (event) => {
        const files = event.target.files;
        const tempArr = [];
        [...event.target.files].forEach((file) => {
            tempArr.push(file);
        });
        setFolderDocName(
            files.length > 1
                ? files.length + " documents has been selected"
                : files[0].name
        );
    };
    const fileUploadSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(initialValues));
        if (validate) {
            setTimeout(() => {
                setToggle(!toggle);
            }, 1000);
        }
    };
    return (
        <>
            <div className='primary_container'>
                <div className='dashboard_page d_flex'>
                    <div className='left_side'>
                        <DashboardLeft />
                    </div>
                    <div className='right_side'>
                        <div className='main_sec d_flex'>
                            <div className='header_con d_flex'>
                                <DashboardHeader userName={userName} />
                            </div>
                            <div className='banner_con d_flex align_item flex_direction'>
                                <div>
                                    <h1>Document Manager</h1>
                                    <div className="select_sec">
                                        <label htmlFor="selectBar">Sort By:</label>
                                        <select id="selectBar" className="selectBar">
                                            <option value="" selected></option>
                                            <option value="Name (A-Z)">Name (A-Z)</option>
                                            <option value="Name (z-A)">Name (Z-A)</option>
                                            <option value="Type">Type</option>
                                        </select>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="upload_section d_flex">
                                    <div className="search_sec">
                                        <input
                                            type="search"
                                            className="search_bar"
                                            name="search"
                                            placeholder="Search all documents"
                                        />
                                        {showSearch && (
                                            <span className="search_icon">
                                                <img src={search} alt="search" />
                                            </span>
                                        )}
                                    </div>
                                    <button className="uploadBtn" onClick={handleUploadClick}>
                                        Upload <span className="arrow"></span>
                                    </button>
                                    {toggle && (
                                        <form className="dropdown_list" onSubmit={fileUploadSubmit}>
                                            <div className="upload_cards">
                                                <FileUploader
                                                    multiple={true}
                                                    handleChange={handleChange}
                                                    name="file"
                                                    types={fileTypes}
                                                />
                                                <img className='filename file_upload' src={Plus} alt="plus" />
                                                <p className="filename">{file ? `${file[0].name}` : "Drop FIles"}</p>
                                            </div>
                                            <div className="upload_card background_white d_flex">
                                                <input
                                                    class="file-upload-input"
                                                    id="file_typedoc"
                                                    type="file"
                                                    title='Select PDF'
                                                    name="fileDocument"
                                                    multiple
                                                    value={initialValues.fileDocument}
                                                    onChange={handleselectedDocFile}
                                                />
                                                <img className='file_upload' src={File__upload} alt="fileUpload" />
                                                <label for="file_typedoc" className="file_typedoc">
                                                    <span>{filedocName}</span>
                                                </label>
                                                <span className="error_feild" id="fileUpload">
                                                    {formErrors.fileDocument}
                                                </span>
                                            </div>
                                            <div className="upload_card background_white d_flex">
                                                <input
                                                    class="file-upload-input"
                                                    id="file_typedoc"
                                                    type="file"
                                                    title='Select PDF'
                                                    name="folderDocument"
                                                    multiple
                                                    value={initialValues.folderDocument}
                                                    onChange={handleselectedDocFolder}
                                                />
                                                <img className='folder_upload' src={Folder_upload} alt="upload Folder" />
                                                <label for="file_typedoc" className="file_typedoc last">
                                                    <span>{folderdocName}</span>
                                                </label>
                                                <span className="error_feild" id="folderUpload">
                                                    {formErrors.folderDocument}
                                                </span>
                                            </div>
                                            <div id="submitBtn">
                                                <input className="uploadBtn submit" type="submit" value="Submit" />
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                            <div className='card_list'>
                                <div className="header d_flex">
                                    <h5>All</h5>
                                    <h5 className="color_gray">In Review (#)</h5>
                                    <h5 className="color_gray">Uploading (#)</h5>
                                </div>
                                <div className="table_container">
                                    <table className="table border_remove">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Format</th>
                                                <th>Status</th>
                                                <th>Discipline</th>
                                                <th>Revision</th>
                                                <th>Project</th>
                                                <th>Orginator</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="review">
                                                        For Review
                                                    </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Red House</td>
                                                <td> Smith Const</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Microsoft ATL</td>
                                                <td>JE Dunn</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue" >
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > 
                                                    <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="color_blue">
                                                    Foundation Update 071122
                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="photo" src={Photo_icon} className="icon" title="image" />
                                                        Photo
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="d_flex align_items">
                                                        <img alt="Jpeg_icon" src={Jpeg_icon} className="icon" title="jpeg" />
                                                        JPEG
                                                    </div>

                                                </td>
                                                <td > <div className="review">
                                                    For Review
                                                </div>
                                                </td>
                                                <td>
                                                    Architectural
                                                </td>
                                                <td>
                                                    1
                                                </td>
                                                <td>Bedrock HQ</td>
                                                <td> Kiaus LLC</td>
                                                <td >
                                                    <div className="d_flex align_items">
                                                        <img alt="edit" src={edit_icon} className="icon" title="Edit" />
                                                        <img alt="mail" src={Mail_icon} className="icon small_icon" title="Mail" />
                                                        <img alt="download" src={CloudDownload_icon} className="icon small_icon" title="Download" />
                                                        <img alt="delete" src={Trash_icon} className="icon" title="Delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocManager;