import React, { useState, useEffect } from "react";
import notification from "../Images/notification.png";
import avatar from "../Images/avatar.png";

const DashboardHeader = ({ userName }) => {

    // console.log("userName",userName);

    var dateObj = new Date();
    var dateDay = dateObj.toDateString();
    const [clockState, setClockState] = useState();
    const [dayState, setDayState] = useState();
   

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            var time = date.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              });
            setClockState(time);
            var hrs = date.getHours();
            var round_spin = document.getElementById("roun_spin");
            if (hrs < 12) {
                setDayState('Good Morning');
                document.getElementById("roun_spin").backgroundColor = "rgb(243, 212, 34)";
            }
            else if (hrs >= 12 && hrs <= 15) {
                setDayState('Good Afternoon');
                if(round_spin)round_spin.backgroundColor = "rgb(243, 212, 34)";
            }
            else if (hrs > 15 && hrs <= 20) {
                setDayState('Good Evening');
                if(round_spin)round_spin.backgroundColor = "#1d2744";

            }
            else if (hrs > 20 && hrs <= 24) {
                setDayState('Good Night');
                if(round_spin)round_spin.backgroundColor = "#1d2744";
            }
        }, 1);
    }, []);
    return (


        <>
            <div className='d_flex'>
                <ul className='left_align d_flex'>
                    <li>
                        <p className='rounded'><span id='roun_spin'></span>{dayState}</p>
                        <p>
                            <span>{dateDay} </span>
                            <span>, {clockState}</span>
                        </p>
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
                        <p className='nameAvatar d_flex m-0'>{userName}
                            &nbsp;
                            <span>
                                <img className='avatar_img' src={avatar} alt="name" />
                            </span>
                        </p>
                    </li>
                </ul>
            </div></>


    )
}
export default DashboardHeader;