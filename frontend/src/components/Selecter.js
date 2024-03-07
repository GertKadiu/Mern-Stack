import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";



const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "#1E1D23",
      color: "#FFFFFF",
    },
  },
};

const StyledSelect = styled(Select)({
  "&.MuiSelect-root": { color: "white !important" },
});

export default function MultipleSelect(props) {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    axios
      .get("https://mern-kzu7.onrender.com/")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

const handleSelectChange = (event) => {
  const selectedUserId = event.target.value;
  // Ensure that `selectedUserId` is a valid user ID
  if (users.find((user) => user._id === selectedUserId)) {
    setSelectedUserIds([...selectedUserIds, selectedUserId]);
  }
  props.onChange(event);
};

  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          "& .MuiSelect-root": { borderColor: "#666666 ", color: "#FFFFFF", width:"312px" },
        }}
      >
        <InputLabel style={{ color: "#FFFFFF" }} id="demo-simple-select-label">
          Participants
        </InputLabel>
        <StyledSelect
          sx={{
            " .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666666 !important",
              color: "#FFFFFF",
              height: "50px",
              
            },
            ".css-qiwgdb.css-qiwgdb.css-qiwgdb" : {
              color: "#FFFFFF",
            },
            ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
              {
                color: "#FFFFFF",
              },
            ".css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#FFFFFF",
            },
            ".css-1jbqyha": {
              color: "#FFFFFF",
            },
            ".css-1v4ccyo.Mui-error .MuiOutlinedInput-notchedOutline ": {
              borderColor: "#FFFFFF",
            },
            ".css-1v4ccyo": {
              color: "#FFFFFF",
            },
            ".css-1ald77x.Mui-error": {
              color: "#FFFFFF",
            },
            ".css-5zrju3": {
              color: "#FFFFFF",
            },
            ".css-1898b66": {
              color: "#FFFFFF",
            },
            ".css-1636szt": {
              color: "#FFFFFF",
            },
            ".css-bn9x3e": {
              color: "#FFFFFF",
            },
            ".css-jbc3jo": {
              color: "#FFFFFF",
            },
          }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.value}
          onChange={handleSelectChange}
          label="Participants"
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem
              sx={{ color: "#FFFFFF", backgroundColor: "transparent" }}
              key={user._id}
              value={user._id}
            >
              {user.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}



