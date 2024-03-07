import classes from "./SingleEvent.module.css";
import { Link } from "react-router-dom";
import ArrowIcon from "../components/ArrowIcon";
import Avatar from "@mui/material/Avatar";
import Modal from "../components/Modal/Modal";
import { format } from "date-fns";
import GroupIcon from "@mui/icons-material/Group";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Title from "../components/Title/Title";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ManageLikes } from "../hooks/Action";
import { SingleEventContent } from "../components/Content/EventsContent";
import { SingleEventHook } from "../hooks/Action";

const SingleEvent = () => {
  const {
    closeModal,
    closeModalCancel,
    confirmDelete,
    isValidDate,
    showLikeModal,
    isLoading,
    currentUser,
    openModal,
    handleDeletePost,
    singleEvent,
    showModal,
    id,
    backgroundStyle,
  } = SingleEventHook();
  const { handleLikeEvent, likes, liked, likingUsers } = ManageLikes({
    entityId: id,
  });

  return (
    <div>
      <div style={backgroundStyle}>
        <div className={classes.contanier}>
          <Title
            Icon={
              <Link to="/Events">
                <ArrowIcon />
              </Link>
            }
          >
            {singleEvent.eventName}
          </Title>
        </div>

        <div className={classes.contanier2}>
          <div className={classes.event}>
            <h1>{singleEvent.eventName}</h1>
            {currentUser._id === singleEvent.creator?._id && (
              <Link to={`/editEvent/${singleEvent._id}`}>
                <Button type={ButtonTypes.EDIT} btnText="Edit Event" />
              </Link>
            )}
          </div>
          <div className={classes.data}>
            {isLoading ? (
              <SingleEventContent />
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <CalendarMonthIcon />
                </div>
                <div className={classes.space}>
                  {isValidDate(singleEvent.date)
                    ? format(new Date(singleEvent.date), "d MMM - h:mm a")
                    : "Invalid Date"}
                </div>
              </div>
            )}
            {isLoading ? (
              <SingleEventContent />
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <LocationOnIcon />
                </div>
                <div className={classes.space}>{singleEvent.location}</div>
              </div>
            )}
            {isLoading ? (
              <SingleEventContent />
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <GroupIcon />
                </div>
                <div key={singleEvent.id} className={classes.space}>
                  {singleEvent.creator && singleEvent.creator.name}
                </div>
              </div>
            )}
          </div>
          <div className={classes.about}>
            {isLoading ? (
              <SingleEventContent type="about" />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>About</h2>
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
            )}
            {isLoading ? (
              <SingleEventContent type="description" />
            ) : (
              <div>{singleEvent.description}</div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.end}>
        Participants ({singleEvent.participants?.length})
        <div className={classes.background}>
          {isLoading
            ? singleEvent.participants &&
              singleEvent.participants.map((participant, index) => (
                <SingleEventContent
                  key={`${participant._id}-${index}`}
                  type="participant"
                />
              ))
            : singleEvent.participants &&
              singleEvent.participants.map((participant, index) => (
                <div key={index} className={classes.participants}>
                  <Avatar
                    as={Link}
                    to={`/singleUser/${participant._id}`}
                    src={participant.image}
                    style={{
                      height: "32px",
                      width: "32px",
                      marginRight: "17px",
                    }}
                  />
                  <Link
                    style={{ textDecoration: "none", color: "#FFFFFF" }}
                    to={`/singleUser/${participant._id}`}
                  >
                    {participant.name}
                  </Link>
                </div>
              ))}
        </div>
        {currentUser._id === singleEvent.creator?._id && (
          <Button
            type={ButtonTypes.CREATE}
            btnText="Delete Event"
            onClick={() => handleDeletePost(singleEvent._id)}
          />
        )}
      </div>
      {showModal && (
        <Modal
          type="Confirm Delete"
          confirm="Confirm"
          cancel="Cancel"
          IsConfirm
          onCancel={closeModalCancel}
          onDelete={confirmDelete}
        >
          Are you sure you want to delete this Event?
        </Modal>
      )}
    </div>
  );
};

export default SingleEvent;
