import React, { useCallback } from "react";
import { Field } from "formik";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const useStyle = makeStyles(() => ({
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    borderWidth: 2,
    borderRadius: "5px",
    borderColor: "#000000",
    borderStyle: "dashed",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    // background: " rgba(58, 58, 60, 0.6)",
    // backgroundColor: "#fafafa",
  },
}));

const RenderFileUpload = (props) => {
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
            <CloudUploadIcon fontSize="large" />
          </div>
          <Typography sx={{ textAlign: "center" }}>
            Drag 'n' drop some files here, or click to select files
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
      component={RenderFileUpload}
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
  multiple: false,
  maxFiles: 1,
  accept: {},
};

export default FileUpload;