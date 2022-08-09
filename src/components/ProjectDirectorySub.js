import React from "react";
import { Link } from "react-router-dom";

const ProjectDirectorySub = (props) => {
   
    const { id } = props.sendContact;
    console.log("prijectdirectorySub",props);
    return (
        <Link className='create_card background_orange d_flex' 
       to={{ pathname: `/myProject/${id}`, state: { contact: props.sendContact } }}
        >
                {/* <img 
                className="photo_img" 
                // src={URL.createObjectURL(props.sendContact.photos)} 
                alt={id}
                /> */}
                <p>Hii</p>
                {/* <p>{props.sendContact.projectName}</p> */}
                {/* <p>{props?.sendContact?.photos[0]?.contentType}</p> */}
        </Link>
    )
}

export default ProjectDirectorySub;