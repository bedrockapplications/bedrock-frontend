import React from "react";
import logo from "../Images/Bedrock Rock .png";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Welcome = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="welcome_container">
                <div className="topLayer">
                    <img src={logo} alt="logo" />
                    <div className="title_text">
                        <h1>{t("welcome_to_bedrock!")}</h1>
                        <p>Construction mode simple</p>
                    </div>
                </div>
                <div className="bottomlayer">
                    <div className="nextPage_btnSec">
                        <Link to="/signup">
                            <button className="btn">create your user profile!</button>
                        </Link>

                        <p className="sublink">
                            Already have an account?&nbsp;
                            <Link to="/login" className="nextink">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Welcome;
