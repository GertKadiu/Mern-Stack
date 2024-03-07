import React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user)
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">AppName</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-BUTT " onClick={() => navigate("/events")}>
          Events
        </button>
        <button className="navbar-BUTT " onClick={() => navigate("/home")}>
          Participants
        </button>
        <Avatar
        style={{marginLeft:"15px", height:"34px", width:"34px"}}
        as={Link}
        to={`/SingleUser/${currentUser._id}`}
        src={currentUser.image}
        />
      </div>
    </nav>
  );
};

export default Navbar;
