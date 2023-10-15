import React, { useCallback } from "react";
import { Field } from "formik";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import uploadIcon from '../../Images/uploadIcon.svg';

const useStyle = makeStyles(() => ({
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    borderWidth: 2,
    borderRadius: "5px",
    borderColor: "rgba(58, 58, 60, 0.3)",
    borderStyle: "dashed",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    background: "#E7E7E7",
    cursor:"pointer",
    // backgroundColor: "#fafafa",
  },
}));

const RenderDocUpload = (props) => {
  const { id, disabled, field, form, maxFiles, accept } = props;
  const classes = useStyle();

  const onDrop = useCallback((acceptedFiles, rejfiles) => {
    console.log("acceptedFiles", acceptedFiles);
    form.setFieldValue(field.name, [...acceptedFiles]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles,
    accept,
    onDrop,
  });

  return (
    <>
      <section className="fileContainer" id={id}>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <div>
            <img src={uploadIcon} alt="" />
          </div>
          <Typography sx={{ textAlign: "center", color:"#0F0F0F", fontWeight:"700", cursor:"pointer", margin:"10px 0px" }}>
          Drag & drop files or <span style={{textDecoration: "underline"}}>Browse</span>
          </Typography>
          <Typography sx={{ textAlign: "center", color:"#676767", margin:"10px 0px" }}>
          Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </Typography>
        </div>
      </section>
    </>
  );
};

const FileUpload = (props) => {
  const {
    name,
    label,
    id,
    disabled,
    accept,
    maxFiles,
    multiple,
    typeSupported,
  } = props;
  return (
    <Field
      type="file"
      component={RenderDocUpload}
      name={name}
      label={label}
      id={id}
      accept={accept}
      disabled={disabled}
      maxFiles={maxFiles}
      multiple={multiple}
      typeSupported={typeSupported}
    />
  );
};
FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  maxFiles: PropTypes.number,
  multiple: PropTypes.bool,
  accept: PropTypes.object.isRequired,
};

FileUpload.defaultProps = {
  name: "file",
  id: "file",
  disabled: false,
  multiple: true,
  maxFiles: 5,
  accept: {},
};

export default FileUpload;