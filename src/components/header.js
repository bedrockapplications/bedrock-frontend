import React from "react";
import { Link } from "react-router-dom";
import logo_header from "../Images/Bedrock Black.png";

const Header = () => {
  return (
    <div className="header_container">
      <div className="logo_img">
        <img src={logo_header} alt="logo_image" />
      </div>
      <div className="links_con">
        <ul>
          <li>Products</li>
          <li>Services</li>
          <li>Contacts</li>
          <li>
            <Link to="/login" className="nextink">
              Log in
            </Link>
          </li>
          <li>
            <button>
              <Link to="/signup" className="nextink">
                Sign Up
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
