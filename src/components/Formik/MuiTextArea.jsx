import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";

const RenderTextArea = (props) => {
  const { name, id, label, field, disabled, error } = props;
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
      multiline
      rows={3}
    />
  );
};

const MuiTextArea = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <Field
      component={RenderTextArea}
      name={name}
      id={id}
      label={label}
      {...other}
    />
  );
};

MuiTextArea.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

MuiTextArea.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
};

export default MuiTextArea;
