import React, { useEffect } from "react";
import { Field } from "formik";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;

const RenderSelect = (props) => {
  const {
    id,
    field,
    label,
    form,
    disabled,
    customOnChange,
    options,
    selectSingleOptionByDefault,
    required,
    error,
    size,
  } = props;

  useEffect(() => {
    if (selectSingleOptionByDefault && options?.length === 1) {
      if (typeof options[0] === "object") {
        form.setFieldValue(field?.name, options[0]?.value);
      } else {
        form.setFieldValue(field?.name, options[0]);
      }
    }
    console.log("hello i am from select");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormControl
        required={required}
        size="small"
        variant="outlined"
        fullWidth
      >
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          {...field}
          name={field.name}
          id={id}
          labelId={id}
          label={label}
          disabled={disabled}
          defaultValue=""
          color="primary"
          inputProps={{
            onChange: (event) => {
              if (customOnChange) {
                customOnChange(
                  event.target.value,
                  event.target.name,
                  form.setFieldValue
                );
              }
            },
          }}
        >
          {options?.length > 0 ? (
            options &&
            options?.map((item, i) => {
              return typeof item === "object" && item !== null ? (
                <MenuItem key={item.value + i} value={item.value}>
                  {item.label}
                </MenuItem>
              ) : (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="" disabled>
              No Details
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

const MuiSelectField = (props) => {
  const { name, id, label, ...other } = props;
  return (
    <Field
      component={RenderSelect}
      name={name}
      id={id}
      label={label}
      {...other}
    />
  );
};

MuiSelectField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array,
  customOnChange: PropTypes.func,
};

MuiSelectField.defaultProps = {
  name: "name",
  id: "name",
  label: "Name",
  disabled: false,
  error: false,
  required: false,
};

export default MuiSelectField;

// import React, { useEffect } from "react";
// import { Field } from "formik";
// import Select from "@material-ui/core/Select";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import PropTypes from "prop-types";

// const ITEM_HEIGHT = 48;

// const RenderSelect = (props) => {
//   const {
//     id,
//     label,
//     field,
//     form,
//     disabled,
//     customOnChange,
//     fieldValues,
//     selectSingleOptionByDefault,
//     required,
//     error,
//     size,
//   } = props;

//   useEffect(() => {
//     if (selectSingleOptionByDefault && fieldValues.length === 1) {
//       if (typeof fieldValues[0] === "object") {
//         form.setFieldValue(field.name, fieldValues[0].value);
//       } else {
//         form.setFieldValue(field.name, fieldValues[0]);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <FormControl
//       required={required}
//       size={size}
//       variant='outlined'
//       fullWidth
//       error={error}
//     >
//       <InputLabel id={id}>{label}</InputLabel>
//       <Select
//         {...field}
//         name={field.name}
//         id={id}
//         labelId={id}
//         label={label}
//         disabled={disabled}
//         defaultValue=''
//         MenuProps={{
//           anchorOrigin: {
//             vertical: "bottom",
//             horizontal: "left",
//           },
//           getContentAnchorEl: null,
//           PaperProps: {
//             style: {
//               maxHeight: ITEM_HEIGHT * 4.5,
//             },
//           },
//         }}
//         color='primary'
//         inputProps={{
//           onChange: (event) => {
//             if (customOnChange) {
//               customOnChange(
//                 event.target.value,
//                 event.target.name,
//                 form.setFieldValue
//               );
//             }
//           },
//         }}
//       >
//         {fieldValues.length > 0 ? (
//           fieldValues &&
//           fieldValues?.map((option) => {
//             return typeof option === "object" && option !== null ? (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ) : (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             );
//           })
//         ) : (
//           <MenuItem value='' disabled>
//             No Details
//           </MenuItem>
//         )}
//       </Select>
//     </FormControl>
//   );
// };

// const SelectField = (props) => {
//   const {
//     name,
//     id,
//     label,
//     disabled,
//     customOnChange,
//     fieldValues,
//     selectSingleOptionByDefault,
//     required,
//     error,
//     ...other
//   } = props;
//   return (
//     <Field
//       component={RenderSelect}
//       name={name}
//       id={id}
//       label={label}
//       disabled={disabled}
//       fieldValues={fieldValues}
//       selectSingleOptionByDefault={selectSingleOptionByDefault}
//       customOnChange={customOnChange}
//       required={required}
//       error={error}
//       {...other}
//     />
//   );
// };

// SelectField.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   label: PropTypes.string,
//   disabled: PropTypes.bool,
//   fieldValues: PropTypes.array,
//   customOnChange: PropTypes.func,
//   selectSingleOptionByDefault: PropTypes.bool,
//   required: PropTypes.bool,
//   error: PropTypes.bool,
//   size: PropTypes.string,
// };

// SelectField.defaultProps = {
//   name: "select",
//   id: "select",
//   label: "Select Field",
//   disabled: false,
//   fieldValues: [],
//   selectSingleOptionByDefault: false,
//   required: false,
//   error: false,
//   size: "small",
// };

// export default SelectField;
