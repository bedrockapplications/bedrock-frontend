import React, { useState,useEffect } from "react";


const ProjectDirectorySub = (props) => {
   
   
    const { projectName, id } = props.sendContact;
    
    return (
        <div className='create_card background_orange d_flex'>
            <img className="photo_img" src={URL.createObjectURL(props.sendContact._photos[0])} />
            <p>{props.sendContact.projectName}</p>
            {/* <p>{props?.sendContact?.photos[0]?.contentType}</p> */}
        </div>
    )
}

export default ProjectDirectorySub;