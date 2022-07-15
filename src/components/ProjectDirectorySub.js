import React, { useState,useEffect } from "react";


const ProjectDirectorySub = (props) => {
    console.log("overLoad",props);
    // const [showData, setShowData] = useState(null);
    // console.log("showData678",showData);
    const { projectName, id } = props.sendContact;
    // const { _photos} = props.sendContact;

    // useEffect(()=>{
    //     console.log("showData",showData);
    //     setShowData(props.sendContact[_photos][0]);
    //     console.log("showData",showData);
    // },[])
  
    return (
        <div className='create_card background_blue d_flex'>
            {/* <img alt={`${id}`} width={"250px"} src={URL.createObjectURL(showData)} /> */}
            <p>{projectName}</p>
            {/* <p>{props?.sendContact?.photos[0]?.contentType}</p> */}
        </div>
    )
}

export default ProjectDirectorySub;