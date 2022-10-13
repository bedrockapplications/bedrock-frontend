import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field } from "formik";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const RenderDatePicker = (props) => {
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
  } = props;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          {...field}
          name={name}
          id={id}
          label={label}
          value={value}
          disablePast={disablePast}
          minDate={minDate}
          disabled={disabled}
          onChange={(newValue) => form.setFieldValue(field?.name, newValue)}
          renderInput={(params) => (
            <TextField {...params} autoComplete="off" size="small" fullWidth />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

const MuiDatePicker = (props) => {
  const { name, id, label, ...other } = props;

  return (
    <>
      <Field
        component={RenderDatePicker}
        name={name}
        id={id}
        label={label}
        {...other}
      />
    </>
  );
};

export default MuiDatePicker;
