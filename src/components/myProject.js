import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard_header";
import { useParams } from "react-router-dom";
import DashboardLeft from "./dashboard_left";
import directory from "../Images/PROJECTDIRECTORY.png";
import { getProjectDetails } from "../services/request";

const MyProject = () => {
  const userName = localStorage.getItem("userName");
  const [dataproject, setDataproject] = useState("");
  const [photo, setPhoto] = useState("");
  const param = useParams();
  useEffect(() => {
    // getProjectDetails(param.id);
    const getProjectDetails = () => {
        return fetch(
          `${process.env.REACT_APP_API_URL}/project/getprojectdetailsbyid?_id=` + param.id,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((dt) => {
                setDataproject(dt);
                setPhoto(dt.Photos);
            });
    };
    getProjectDetails();
  }, []);
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className="primary_container">
      <div className="dashboard_page d_flex">
        <div className="left_side">
          <DashboardLeft />
        </div>
        <div className="right_side">
          <div className="main_sec d_flex">
            <div className="header_con d_flex">
              <DashboardHeader userName={userName} />
            </div>
            <div className="banner_con d_flex align_item flex_direction">
              <div>
                <h1>{dataproject.projectName}</h1>
                <p>
                  {dataproject.City}, {dataproject.State} -{" "}
                  {dataproject.Zipcode}
                </p>
                <div className="select_sec onphase">
                  <label htmlFor="selectBar">Ongoing</label>
                  <select id="selectBar" className="selectBar onphase">
                    <option value="" selected></option>
                    <option value="Bidding">Bidding</option>
                    <option value="Pre-Con">Pre-Con</option>
                    <option value="On-site">On-site</option>
                  </select>
                  <span></span>
                </div>
              </div>
              <div className="rounded_Img">
                {photo ? (
                  <img
                    alt="project_Img"
                    src={
                      "data:" +
                      photo[0].contentType +
                      ";base64," +
                      arrayBufferToBase64(photo[0].data.data)
                    }
                  />
                ) : (
                  <img src={directory} alt="directory" />
                )}
              </div>
            </div>
            <div className="card_list height-0">
              <div className="header">
                <h5>Project Overview</h5>
              </div>
              <div className="table_container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Overview</th>
                      <th>
                        <span className="round"></span>
                        Over Due
                        <span className="round"></span>
                        Next 7 Days
                        <span className="round"></span>
                        &gt;7Days
                      </th>
                      <th>Total Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> RFIs</td>
                      <td className="d_flex">
                        <div className="w-100 green">30</div>
                      </td>
                      <td>30</td>
                    </tr>
                    <tr>
                      <td> Submittals</td>
                      <td className="d_flex">
                        <div className="w-30 red">27</div>
                        <div className="w-20 yellow">23</div>
                        <div className="w-50 green">43</div>
                      </td>
                      <td>93</td>
                    </tr>
                    <tr>
                      <td> Schedule</td>
                      <td className="d_flex">
                        <div className="w-25 red">3</div>
                        <div className="w-75 green">15</div>
                      </td>
                      <td>30</td>
                    </tr>
                    <tr>
                      <td> Inspection</td>
                      <td className="d_flex">
                        <div className="w-25 red">3</div>
                        <div className="w-25 yellow">3</div>
                        <div className="w-50 green">15</div>
                      </td>
                      <td>30</td>
                    </tr>
                    <tr>
                      <td className="last_tdleft"> Punchlist</td>
                      <td className="d_flex">
                        <div className="w-25 red">23</div>
                        <div className="w-65 yellow">42</div>
                        <div className="w-10 green">11</div>
                      </td>
                      <td className="last_tdright">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card_list height-0">
              <div className="header">
                <h5>Open Items</h5>
              </div>
              <div className="table_container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item Type</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Submittals</td>
                      <td></td>
                      <td>Open</td>
                      <td>10/10/24</td>
                    </tr>
                    <tr>
                      <td> Submittals</td>
                      <td></td>
                      <td>Open</td>
                      <td>10/10/24</td>
                    </tr>
                    <tr>
                      <td> Meeting</td>
                      <td></td>
                      <td>Open</td>
                      <td>10/10/24</td>
                    </tr>
                    <tr>
                      <td> Misc.</td>
                      <td></td>
                      <td>Open</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td className="last_tdleft">Meeting</td>
                      <td></td>
                      <td>Open</td>
                      <td className="last_tdright">Open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
