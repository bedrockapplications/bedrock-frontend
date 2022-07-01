import React from 'react';
import logo from '../Images/Bedrock Rock .png';
import Footer from '../components/footer';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


const Welcome = () => {
    return (
        <>
            <div className="welcome_container">
                <div className='topLayer'>
                    <img src={logo} alt='logo' />
                    <div className='title_text'>
                        <h1>
                            Welcome to Bedrock!
                        </h1>
                        <p>
                            Construction mode simple
                        </p>
                    </div>
                </div>
                <div className='bottomlayer'>
                    <div className='nextPage_btnSec'>
                        <Link to="/login">
                            <button className='btn'>
                                create your user profile!
                            </button>
                        </Link>

                        <p className='sublink'>
                            Already have an account?&nbsp;
                            <Link to='/login' className='nextink'>Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Welcome;
