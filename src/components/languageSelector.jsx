import React, { useContext } from "react";
import { languageOptions } from "../Languages";
import { LanguageContext } from "../containers/language";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);
  // set selected language by calling context method
  const handleLanguageChange = (e) => userLanguageChange(e.target.value);
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
    <Select 
     labelId="demo-simple-select-label"
     id="demo-simple-select"
    onChange={handleLanguageChange} 
    value={userLanguage}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </Select>
    </FormControl>
    </Box>
  );
}