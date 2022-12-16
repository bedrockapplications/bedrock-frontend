import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";

const RenderPassword = (props) => {
  const { name, id, label, field, disabled, error, required, handleBlur } =
    props;
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
      type="password"
      onBlur={handleBlur}
    />
  );
};

const MuiPasswordField = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <Field
      component={RenderPassword}
      name={name}
      id={id}
      label={label}
      {...other}
    />
  );
};

MuiPasswordField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  handleBlur: PropTypes.func,
};

MuiPasswordField.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
  required: false,
};

export default MuiPasswordField;
