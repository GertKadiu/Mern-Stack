import React, { useState } from "react";
import Card from "../../UI/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import classes from "./Post.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { ManageLikes } from "../../hooks/Action";
import Modal from "../Modal/Modal";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Post({
  image,
  location,
  participants,
  description,
  date,
  name,
  eventName,
  View,
  id,
}) {
  const [showLikeModal, setShowLikeModal] = useState(false);

  const { handleLikeEvent, liked, likes, likingUsers } = ManageLikes({
    entityId: id,
  });

  const openModal = () => {
    setShowLikeModal(true);
  };

  const closeModal = () => {
    setShowLikeModal(false);
  };

  return (
    <Card>
      <div className={classes.conatiner}>
        <img src={image} alt="Event" className={classes.img} />
        <div className={classes.date}>{date}</div>
        <div className={classes.space}>
          <div className={classes.eventName}>{eventName}</div>
          <div className={classes.location}>
            <LocationOnIcon />
            <div className={classes.text}>{location}</div>
          </div>
          <div className={classes.logo}>
            <GroupIcon />
            <div className={classes.text}>{name}</div>
          </div>
          <div
            style={{
              width: "297px",
              height: "78px",
            }}
          >
            {description}
          </div>
          <div className={classes.participants}>
            Participants: {participants}
            <div style={{ display: "flex", alignItems: "center" }}>
              {showLikeModal && (
                <Modal Iscancel onClick={closeModal}>
                  {likingUsers.map((user, index) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                      key={index}
                    >
                      <Avatar
                        src={user?.image}
                        as={Link}
                        to={`/singleUser/${user._id}`}
                        style={{ marginRight: "10px" }}
                      />
                      <Link
                        style={{ color: "#FFFFFF", textDecoration: "none" }}
                        to={`/singleUser/${user._id}`}
                      >
                        {user.name}
                      </Link>
                    </div>
                  ))}
                </Modal>
              )}
              <div onClick={openModal}>{likes}</div>
              <IconButton onClick={handleLikeEvent}>
                {liked ? (
                  <FavoriteIcon
                    sx={{
                      width: 20,
                      height: 20,
                      color: "red",
                      borderRadius: "300px",
                      padding: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.18)",
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      width: 20,
                      height: 20,
                      color: "#FFFFFF",
                      backgroundColor: "rgba(255, 255, 255, 0.18)",
                      borderRadius: "300px",
                      padding: "8px",
                    }}
                  />
                )}
              </IconButton>
            </div>
          </div>
          <div style={{ alignItems: "center" }}>{View}</div>
        </div>
      </div>
    </Card>
  );
}

export default Post;
