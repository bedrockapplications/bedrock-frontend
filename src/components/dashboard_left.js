import React from "react";
import dotted_img from "../Images/Dotted Circles.png";
import logo_img from "../Images/Bedrock Black.png";
import { Link} from 'react-router-dom';

const DashboardLeft = () => {

    return (
        <div className='dashboard'>
            <div className='logo_img'>
                <Link to="dashboard">
                    <img src={logo_img} alt="logo_img" />
                </Link>
            </div>
            <div className='link_sec'>
                <div className='link_menu'>
                    <Link to="projectDirectory" className='dotted d_flex Link'>
                        <img src={dotted_img} alt="select" />
                        <h3>Select Project</h3>
                    </Link>
                    <ul>
                        <li>
                            <Link to="/dashboard" className='Link' >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/projectDirectory" className='Link'>
                                My Projects
                            </Link>
                        </li>
                        <li>
                        <Link to="/docManager" className='Link'>
                            Document Manager
                            </Link>
                            </li>
                        <li>Schedule</li>
                        <li>Tasks/Calendar</li>
                        <li>Automated Take Off</li>
                        <li>Contact Directory</li>
                        <li>5xtContracts</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardLeft;