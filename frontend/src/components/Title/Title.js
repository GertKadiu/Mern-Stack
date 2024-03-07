import React from "react";
import classes from "./Title.module.css";

function Title(props) {
  return (
    <div className={classes.contanier}>
      <div className={classes.Icon}>{props.Icon}</div>
      <div className={classes.name}>
        <h1>{props.children}</h1>
      </div>
    </div>
  );
}

export default Title;
