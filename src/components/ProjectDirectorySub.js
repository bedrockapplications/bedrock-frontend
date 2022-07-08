import React from "react";

const ProjectDirectorySub = (props) => {
    const { id, name, email } = props.sendContact;
console.log("probsSub", props);
    return (
        <div className='create_card background_blue d_flex'>
            {/* <img src={plus} alt="projectDir" /> */}
            <p>{name}</p>
        </div>
    )
}

export default ProjectDirectorySub;