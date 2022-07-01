import React from 'react';
import dotted_img from "../Images/Dotted Circles.png";
import logo_img from "../Images/Bedrock Black.png";
import employee from "../Images/employee.png";
import crane from "../Images/crane.png";
import cloud from "../Images/CLoud.png";
import notification from "../Images/notification.png";
import avatar from "../Images/avatar.png";
import plus from "../Images/Plus.png"
import { Link} from 'react-router-dom';
import Header from './header';
import Footer from './footer';



const ProjectDirectory = () => {

    const placeHolder = () => {
        return (
            <>
                <p>Place Holder for something important <br />(Consult W/Team)</p>
            </>
        )
    }
    return (
        <>
     
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
                                        <Link to="dashboard" className='Link'>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="projectDirectory" className='Link'>
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
                        <div className='banner_con d_flex align_center'>
                            <h1>Project Directory</h1>
                            <p>Ongoing Projects</p>
                        </div>

                        <div  className='card_con d_flex'>
                            <Link to="createProject" className='create_card background_blue d_flex'>
                                <img src={plus} alt="projectDir" />
                                <p>Create A Project</p>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
       
        </>
    )
}
export default ProjectDirectory;