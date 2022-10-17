import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";
import Input from "@mui/material/Input";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const RenderUpload = (props) => {
  const { name, id, label, field, disabled, error, form } = props;
  const fileRef = useRef(null);

  const uploadFile = ({}) => {};
  return (
    <>
      <label htmlFor="icon-button-file">
        <Input
          ref={fileRef}
          id="icon-button-file"
          type="file"
          onChange={uploadFile}
          style={{ display: "none" }}
        />
        <TextField
          {...field}
          name={name}
          id={id}
          label={label}
          error={error}
          disabled={disabled}
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          type="file"
          InputLabelProps={{ shrink: true }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="upload" onClick={() => {}} edge="end">
                <CloudUploadIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </label>
    </>
  );
};

const MuiFileUpload = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <Field
      component={RenderUpload}
      name={name}
      id={id}
      label={label}
      type="file"
      {...other}
    />
  );
};

MuiFileUpload.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

MuiFileUpload.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
};

export default MuiFileUpload;
