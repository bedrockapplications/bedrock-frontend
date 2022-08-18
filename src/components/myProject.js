import React,{useEffect, useState} from "react";
import DashboardHeader from "./dashboard_header";
import DashboardLeft from "./dashboard_left";
import project_Img from "../Images/PROJECTDIRECTORY.png";


const MyProject = (props) => {
    console.log("myProject", props);
  
    const userName = localStorage.getItem("userName");
    const Id = localStorage.getItem("id");

    const[dataproject,setDataproject] = useState(Id);

    console.log("dataproject",dataproject);
    useEffect(() => {
        const getProjectDetails = () => {
          return fetch(
            "http://localhost:3000/api/project/getprojectdetailsbyid?_id=" +  Id,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((dt) => {
              console.log("taamil", dt);
              setDataproject(dt);
            });
        };
        getProjectDetails();
      }, []);
    

    return (
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
                                    <h1>{dataproject.projectName}</h1>
                                    <p>{dataproject.City}, {dataproject.State} - {dataproject.Zipcode}</p>
                                    <p>Ongoing <span className="round"></span> [Current Phase]</p>
                                </div>
                                <div className="rounded_Img">
                                    <img src={project_Img} alt="project_Img"/>
                                </div>
                            </div>
                            <div className='card_list height-0'>
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
                                                <td>
                                                    30
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> Submittals</td>
                                                <td className="d_flex">
                                                    <div className="w-30 red">27</div>
                                                    <div className="w-20 yellow">23</div>
                                                    <div className="w-50 green">43</div>
                                                </td>
                                                <td>
                                                    93
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> Schedule</td>
                                                <td className="d_flex">
                                                    <div className="w-25 red">3</div>
                                                    <div className="w-75 green">15</div>
                                                </td>
                                                <td>
                                                    30
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> Inspection</td>
                                                <td className="d_flex">
                                                    <div className="w-25 red">3</div>
                                                    <div className="w-25 yellow">3</div>
                                                    <div className="w-50 green">15</div>
                                                </td>
                                                <td>
                                                    30
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="last_tdleft"> Punchlist</td>
                                                <td className="d_flex">
                                                    <div className="w-25 red">23</div>
                                                    <div className="w-65 yellow">42</div>
                                                    <div className="w-10 green">11</div>
                                                </td>
                                                <td className="last_tdright">
                                                    30
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='card_list height-0'>
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
                                                <td>

                                                </td>
                                                <td>
                                                    Open
                                                </td>
                                                <td>10/10/24</td>
                                            </tr>
                                            <tr>
                                                <td> Submittals</td>
                                                <td>

                                                </td>
                                                <td>
                                                    Open
                                                </td>
                                                <td>10/10/24</td>
                                            </tr>
                                            <tr>
                                                <td> Meeting</td>
                                                <td>

                                                </td>
                                                <td>
                                                    Open
                                                </td>
                                                <td>10/10/24</td>
                                            </tr>
                                            <tr>
                                                <td> Misc.</td>
                                                <td>

                                                </td>
                                                <td>
                                                    Open
                                                </td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td className="last_tdleft">Meeting</td>
                                                <td>
                                                   
                                                </td>
                                                <td>Open</td>
                                                <td className="last_tdright">
                                                    Open
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
    )
}

export default MyProject;