import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RenderPassword = (props) => {
  const { name, id, label, field, disabled, error, required, handleBlur } =
    props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...field}
      name={field.name}
      id={id}
      label={label}
      error={error}
      disabled={disabled}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      required={required}
      type={showPassword ? "text" : "password"}
      onBlur={handleBlur}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
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
