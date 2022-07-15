import React, { useState } from 'react';
import plus from "../Images/Plus.png";
import { Link } from 'react-router-dom';
import DashboardHeader from './dashboard_header';
import DashboardLeft from './dashboard_left';
import ProjectDirectorySub from './ProjectDirectorySub';


const ProjectDirectory = (props) => {
    console.log("props", props);
    const userName = localStorage.getItem("userName");

    const [showData, setShowData] = useState(props.createProJect);
    // setShowData(props);
    // const {imageShow} = props;
    // const { projectName} = props.createProJect[0];
    // console.log("allTime",projectName);
    // console.log("allImages", imageShow);
    // useEffect(()=>{
    //     setShowData(Images);
    // },[Images])
    const renderContactList = showData.map((contact) => {
        return (
            <ProjectDirectorySub
                sendContact={contact}
                key={contact.id}
            />
            // <div className='create_card background_blue d_flex'>
            //     {contact}
            // {/* <img
            //     src={data}
            //     width="200" height="100"
            //     alt={`img_${id}`}
            // />
            // <p>{projectName}</p> */}
        // </div>
        )
    });

    // const renderContactList = props.map((data) => {
    //     console.log("setting", data)
    //     return (
    //         <ProjectDirectorySub
    //             sendContact={data}
    //             key={data.id}
    //             setImage={data}
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
                                    {renderContactList}
                                    {/* <div className='create_card background_blue d_flex'>
                                        <div>
                                            {/* <img alt="not fount" width={"250px"} src={URL.createObjectURL(Images)} /> */}
                                        {/* </div>
                                    </div> */}
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