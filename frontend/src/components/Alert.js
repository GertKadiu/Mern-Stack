import MuiAlert from "@mui/material/Alert";
import React from "react";

export const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      sx={{ zIndex: "10000", marginTop: "10px", textAlign:"center" }}
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});
