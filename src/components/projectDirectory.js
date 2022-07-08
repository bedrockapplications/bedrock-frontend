import React from 'react';
import plus from "../Images/Plus.png";
import { Link } from 'react-router-dom';
import DashboardHeader from './dashboard_header';
import DashboardLeft from './dashboard_left';
// import ProjectDirectorySub from './ProjectDirectorySub';


const ProjectDirectory = () => {
    // console.log("props",props)

    const userName = localStorage.getItem("userName");
    // const formValues = localStorage.getItem("formValues");
    // const { id, name, email } = props.sendContact;
    // const renderContactList = formValues.map((contact) => {
    //     return (
    //         <ProjectDirectorySub
    //             sendContact={contact}
    //             key={contact.id}
    //         />
    //     )
    // });

    return (
        <>
            <div className='primary_container'>
                <div className='dashboard_page d_flex '>
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
                                    {/* {renderContactList.length > 0 ? renderContactList : "No Contacts Available"} */}
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