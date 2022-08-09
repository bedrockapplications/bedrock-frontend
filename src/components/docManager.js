import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard_header";
import DashboardLeft from "./dashboard_left";
import DocTable from "./docManagerTable";
import axios from 'axios';

const DocManager = () => {
    const userName = localStorage.getItem("userName");
    const [data, setData] = useState([]);

    const handleUploadClick = (e) =>{
        e.preventDefault();
        console.log('You clicked submit.');
      }

    const retrieveContacts = async () => {
        const response = await axios.get("https://restcountries.com/v2/all");
        // const resData = response.data;
        // debugger
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
                                <div >
                                    <h1>Project Directory</h1>
                                    <p>Ongoing Projects</p>
                                </div>
                                <div className="">
                                    <button onClick={handleUploadClick}>
                                        Upload <span className="arrow"></span>
                                    </button>
                                </div>
                            </div>
                            <div className='card_list'>
                                <DocTable data={data} />
                                <div className="table_container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="checkbox" id="select_all" />
                                                </th>
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
                                                <td>
                                                    <input type="checkbox" class="checkbox" value="1" />
                                                </td>
                                                <td> RFIs</td>
                                                <td className="d_flex">
                                                    <div className="w-100 green">30</div>
                                                </td>
                                                <td>
                                                    30
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="checkbox" value="2" />
                                                </td>
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
                                                <td>
                                                    <input type="checkbox" class="checkbox" value="3" />
                                                </td>
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
                                                <td>
                                                    <input type="checkbox" class="checkbox" value="4" />
                                                </td>
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
                                                <td>
                                                    <input type="checkbox" class="checkbox" value="5" />
                                                </td>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocManager;