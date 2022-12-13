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
    handleBlur,
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
      onBlur={handleBlur}
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
  handleBlure: PropTypes.func,
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

// import React from "react";
// import TextField from "@material-ui/core/TextField";
// import { Field } from "formik";
// import PropTypes from "prop-types";

// const RenderInput = (props) => {
//   const {
//     id,
//     label,
//     disabled,
//     field,
//     multiline,
//     error,
//     rows,
//     readOnly,
//     required,
//     autoFocus,
//     handleFocus,
//     placeholder,
//     shrink
//   } = props;

//   return (
//     <TextField
//       {...field}
//       id={id}
//       name={field.name}
//       label={label}
//       disabled={disabled}
//       color="primary"
//       variant="outlined"
//       type="text"
//       size="small"
//       fullWidth
//       autoComplete="off"
//       autoFocus={autoFocus}
//       multiline={multiline}
//       placeholder={placeholder}
//       rows={rows}
//       error={error}
//       required={required}
//       onFocus={handleFocus}
//       InputProps={{
//         readOnly: readOnly,
//       }}
//       InputLabelProps={{
//         shrink: shrink,
//       }}
//     />
//   );
// };

// const TextInput = (props) => {
//   const {
//     name,
//     id,
//     label,
//     disabled,
//     rows,
//     error,
//     multiline,
//     readOnly,
//     required,
//     autoFocus,
//     handleFocus,
//     placeholder,
//     shrink,
//     ...other
//   } = props;
//   return (
//     <Field
//       component={RenderInput}
//       disabled={disabled}
//       multiline={multiline}
//       rows={rows}
//       name={name}
//       id={id}
//       label={label}
//       type="text"
//       error={error}
//       {...other}
//       readOnly={readOnly}
//       required={required}
//       autoFocus={autoFocus}
//       handleFocus={handleFocus}
//       placeholder={placeholder}
//       shrink={shrink}

//     />
//   );
// };

// TextInput.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   label: PropTypes.string,
//   disabled: PropTypes.bool,
//   multiline: PropTypes.bool,
//   rows: PropTypes.number,
//   error: PropTypes.bool,
//   readOnly: PropTypes.bool,
//   required: PropTypes.bool,
//   autoFocus: PropTypes.bool,
//   placeholder: PropTypes.string
// };

// TextInput.defaultProps = {
//   name: "textInput",
//   id: "textInput",
//   label: "Text Input",
//   disabled: false,
//   multiline: false,
//   rows: 0,
//   error: false,
//   readOnly: false,
//   required: false,
//   autoFocus: false,
//   placeholder: ""
// };

// export default TextInput;
