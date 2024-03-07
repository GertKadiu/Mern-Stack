import React from 'react'
import classes from "./SecondTitle.module.css"
import PrimarySearchAppBar from './Search/Search'
import Button from '../UI/Button/Button'
import { ButtonTypes } from '../UI/Button/ButtonTypes'

const SecondTitle = ({ onChange, onClick, value, Text, Text2, countUsers, countPost }) => {
  return (
    <div>
       <div className={classes.title}>
        <div className={classes.upcoming}>{Text2}</div>
        <div className={classes.serach}>
          <PrimarySearchAppBar
            onChange={onChange}
            value={value}
          />
          <Button
            type={ButtonTypes.EDIT}
            onClick={onClick}
            btnText={Text}
          />
        </div>
      </div>
      {countPost ? (<div className={classes.text}>
        <div className={classes.counter}>Total Events : {countPost}</div>
      </div>) : <div className={classes.text}>
        <div className={classes.counter}>Total Profiles : {countUsers}</div>
      </div>}
    </div>
    
  )
}

export default SecondTitle
