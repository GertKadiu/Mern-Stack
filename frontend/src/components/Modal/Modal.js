import React from "react";
import classes from "./Modal.module.css";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

function Modal(props) {
  return (
    <div>
      {props.IsConfirm && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <h3>{props.type}</h3>
            <p>{props.children}</p>
            <button onClick={props.onDelete} className={classes.delete}>
              {props.confirm}
            </button>
            <button onClick={props.onCancel} className={classes.cancel}>
              {props.cancel}
            </button>
          </div>
        </div>
      )}
      {props.Iscancel && (
        <div className={classes.overlay}>
          <div className={classes.modal2}>
            <div style={{ display: "flex", justifyContent:"space-between", alignItems:"center" }}>
              <div className={classes.likes}>Likes</div>
              <ClearSharpIcon style={{ color: "#FFFFFF"}} onClick={props.onClick}/>
            </div>
            <div className={classes.er}></div>
            <div>{props.children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
