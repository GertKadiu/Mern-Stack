import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDateField = styled(DateField)({
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",
    width:"312px"
  },
  "& .MuiOutlinedInput-input": {
    color: "#FFFFFF",
    padding: "12.5px 14px",
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
  },
  "& .MuiInputLabel-root:focus": {
    color: "#FFFFFF",
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#666666",
  },
  "& .MuiOutlinedInput-input:focus": {
    color: "#FFFFFF",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-error": {
    color: "#FFFFFF",
  },
  "& .Mui-error": {
    color: "#FFFFFF",
  },
  "& .MuiFormControl-root.MuiTextField-root .MuiFormLabel-root.MuiInputLabel-root.Mui-error": {
    color: "#FFFFFF",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#666666",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#666666",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#666666",
  },
});

export default function Calendar(props) {
  const disablePastDates = (date) => {
    const currentDate = dayjs();
    const startOfDay = currentDate.startOf("day");
    
    // Disable past dates
    if (date.isBefore(startOfDay)) {
      return true;
    }

    // Disable selection of months and years
    const today = currentDate.format("YYYY-MM-DD");
    const selectedDate = date.format("YYYY-MM-DD");

    return today === selectedDate;
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDateField
          label="Calendar"
          ref={props.ref}
          onChange={props.onChange}
          value={props.value}
          shouldDisableDate={disablePastDates}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
