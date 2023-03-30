import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";

const RenderEmail = (props) => {
  const { name, id, label, field, disabled, error, required } = props;
  return (
    <>
      <TextField
        {...field}
        id={id}
        name={field.name}
        type="email"
        label={label}
        error={error}
        disabled={disabled}
        variant="outlined"
        size="small"
        fullWidth
        autoComplete="off"
        required={required}
      />
    </>
  );
};

const MuiEmailField = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <>
      <Field
        component={RenderEmail}
        name={name}
        id={id}
        label={label}
        {...other}
      />
    </>
  );
};

MuiEmailField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
};

MuiEmailField.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
  required: false,
};

export default MuiEmailField;
