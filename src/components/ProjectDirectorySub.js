import React from "react";
import { Link } from "react-router-dom";

const ProjectDirectorySub = (props) => {
  const { _id , Photos,projectName } = props.sendContact;
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
      to={{pathname: `/myProject/${_id}`}}
    >
      <img
        className="photo_img"
        src={
          "data:" +
          Photos[0].contentType +
          ";base64," +
          arrayBufferToBase64(Photos[0].data.data)
        }
      />
      <p>{projectName}</p>
    </Link>
  );
};

export default ProjectDirectorySub;
