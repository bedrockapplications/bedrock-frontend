import React from "react";
import { Link } from "react-router-dom";

const ProjectDirectorySub = (props) => {
  const { _id } = props.sendContact;
  const { Photos } = props.sendContact;
  console.log("prijectdirectorySub", Photos[0].data.data);
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  return (
    <Link
      className="create_card background_orange d_flex"
      to={{
        pathname: `/myProject/${_id}`,
        state: { contact: props.sendContact },
      }}
    >
      {/* <img 
                className="photo_img" 
                // src={URL.createObjectURL(props.sendContact.photos)} 
                alt={id}
                /> */}

      <img
        className="photo_img"
        src={
          "data:" +
          Photos[0].contentType +
          ";base64," +
          arrayBufferToBase64(Photos[0].data.data)
        }
      />
      {/* <p>{projectName}</p> */}
      <p>{props.sendContact.projectName}</p>
      {/* <p>{props?.sendContact?.photos[0]?.contentType}</p> */}
    </Link>
  );
};

export default ProjectDirectorySub;
