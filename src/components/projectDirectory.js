import React, { useEffect, useState } from "react";
import plus from "../Images/Plus.png";
import { Link } from "react-router-dom";
import DashboardHeader from "./dashboard_header";
import DashboardLeft from "./dashboard_left";
import ProjectDirectorySub from "./ProjectDirectorySub";

const ProjectDirectory = (props) => {
  console.log("props", props);
  const [selectedProject, setSelectedProject] = useState([]);

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

    const getUserDetails = async () => {
        return fetch("http://localhost:3000/api/project/getprojects?userId=" + userId, {
          method: "GET",

        })
          .then((response) => response.json())
          .then((dt) => {
            console.log("dt", dt);
            setSelectedProject(dt);
            props.getProjectData(dt);
            console.log(selectedProject);
          });
      };
      useEffect(() => {
        getUserDetails();
    }, [1]);
       
      
    const renderContactList = props.createProJect.map((contact) => {
        return (
            <ProjectDirectorySub
                sendContact={contact}
                key={contact.id}
            />
        )
    });
   
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
                            <div className='banner_con d_flex align_center'>
                                    <h1>Project Directory</h1>
                                    <p>Ongoing Projects</p>
                            </div>
                            <div className='card_list'>
                                <div className='card_con d_flex justify-con'>
                                    <Link to="createProject" className='create_card background_blue d_flex'>
                                        <img src={plus} alt="projectDir" />
                                        <p>Create A Project</p>
                                    </Link>
                                    {renderContactList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProjectDirectory;
