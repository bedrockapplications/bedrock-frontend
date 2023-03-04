import React, { useState } from "react";
import plsupload from "../../Images/plsupload.svg";
import { Grid, Button, Box } from "@mui/material";

export default function PicUpload(props) {
  const { name, setFieldValue } = props;
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      let imgObj = {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      };
      setImage(imgObj);
      setFieldValue(name, imgObj);
    }
    // handleUpload();
  };

  const handleUpload = async () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label htmlFor={name}>
            {image.preview ? (
              <img src={image.preview} alt="dummy" width="150" height="150" />
            ) : (
              <>
                {/* <span className="fa-stack fa-2x mt-3 mb-2">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fas fa-store fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-center">Upload your photo</h5> */}
                <img src={plsupload} alt="dummy" width="150" height="150" />
              </>
            )}
          </label>
          <input
            type="file"
            name={name}
            id={name}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
        </Grid>
      </Grid>
    </div>
  );
}
