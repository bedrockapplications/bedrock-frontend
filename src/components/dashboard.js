import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import employee from "../Images/employee.png";
import crane from "../Images/crane.png";
import cloud from "../Images/CLoud.png";
import DashboardHeader from './dashboard_header';
import DashboardLeft from './dashboard_left';


const Dashboard = () => {

    const placeHolder = () => {
        return (
            <>
                <p>Place Holder for something important <br />(Consult W/Team)</p>
            </>
        )
    }
    const userName = localStorage.getItem("userName");
    const userFirstName = localStorage.getItem("userFirstName");
   

    return (
        <div className='primary_container'>
            <div className='dashboard_page d_flex '>
                <div className='left_side'>
                    <DashboardLeft userName={userName}/>
                </div>
                <div className='right_side'>
                    <div className='main_sec d_flex'>
                        <div className='header_con d_flex'>
                            <DashboardHeader userName={userName}/>
                        </div>
                        <div className='banner_con d_flex'>
                            <img className='employee_img' src={employee} alt="employee" />
                            <span className='cloud_1'><img src={cloud} alt="cloud" /></span>
                            <div className='text_con'>
                                <h2 className='userName'>Hi, {userFirstName}!</h2>
                                <p>You have completed 2 of your Projects this week, there are 3 Projects to go, keep on rolling and reach your goal!</p>

                            </div>
                            <img className='crane' src={crane} alt="lader" />
                            <span className='cloud'><img src={cloud} alt="cloud" /></span>
                        </div>
                        <div className='card_con d_flex'>
                            <div className='cardPart background'>
                                {placeHolder()}
                            </div>
                            <div className='cardPart d_flex '>
                                <div className='cards_one d_flex '>
                                    <div className='childcard background'>
                                        {placeHolder()}
                                    </div>
                                    <div className='childcard background'>
                                        {placeHolder()}
                                    </div>
                                </div>
                                <div className='cards_second background'>
                                    {placeHolder()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;