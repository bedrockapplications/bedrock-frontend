import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field } from "formik";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const RenderTimePicker = (props) => {
  const {
    name,
    id,
    label,
    field,
    value,
    disablePast,
    minDate,
    disabled,
    form,
    required
  } = props;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          {...field}
          name={name}
          id={id}
          label={label}
          value={value}
          TimePicker={minDate}
          disabled={disabled}
          onChange={(newValue) => form.setFieldValue(field?.name, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              autoComplete="off"
              size="small"
              fullWidth
              required={required}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

const MuiTimePicker = (props) => {
  const { name, id, label, ...other } = props;

  return (
    <>
      <Field
        component={RenderTimePicker}
        name={name}
        id={id}
        label={label}
        {...other}
      />
    </>
  );
};

export default MuiTimePicker;
