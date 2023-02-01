import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";

const RenderTextField = (props) => {
  const {
    name,
    id,
    label,
    field,
    disabled,
    error,
    required,
    type,
  } = props;
  return (
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
      required={required}
      type={type}
    />
  );
};

const MuiTextField = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <Field
      component={RenderTextField}
      name={name}
      id={id}
      label={label}
      {...other}
    />
  );
};

MuiTextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
};

MuiTextField.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
  required: false,
  type: "text",
};

export default MuiTextField;
