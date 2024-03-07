import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { SingleUserEvents } from "../hooks/Action";
import classes from "./SingleUser.module.css";
import ArrowIcon from "../components/ArrowIcon";
import Post from "../components/Post/Post";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import { useSelector } from "react-redux";
import { Signout } from "../hooks/Action";
import { format } from "date-fns";
import { EventsContent } from "../components/Content/EventsContent";

const SingleUser = () => {
  const [singleUser, setSingleUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { handleSignOut } = Signout();
  const { id } = useParams();
  const {
    creatorEvents,
    handleTabClick,
    activeTab,
    participantEvents,
    isLoading,
  } = SingleUserEvents();

  useEffect(() => {
    axios
      .get(`https://mern-kzu7.onrender.com/SingleUser/${id}`)
      .then((result) => setSingleUser(result.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={classes.contanier}>
      {currentUser._id === singleUser?._id ? (
        <div className={classes.title}>
          <Link to="/home">
            <ArrowIcon />
          </Link>
          <h1>{singleUser?.name}</h1>
          <Button
            type={ButtonTypes.SIGNOUT}
            onClick={handleSignOut}
            btnText="SIGNOUT"
          />
        </div>
      ) : (
        <Title
          Icon={
            <Link
              to="/home"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ArrowIcon />
            </Link>
          }
        >
          {singleUser?.name}
        </Title>
      )}

      {singleUser && (
        <div className={classes.background}>
          <Avatar
            as={Link}
            to={`/SingleUser/${singleUser._id}`}
            style={{ height: "80px", width: "80px", marginRight: "16px" }}
            src={singleUser.image}
          />
          <div className={classes.name}>
            <div className={classes.link}>{singleUser.name}</div>
            <div className={classes.email}> {singleUser.email}</div>
          </div>
          <div className={classes.icon}>
            {currentUser._id === singleUser?._id ? (
              <Link to={`/Update/${currentUser._id}`}>
                <Button
                  btnText="Edit Profile"
                  type={ButtonTypes.EDIT}
                  style={{ padding: "5px 10px", fontSize: "14px" }}
                />
              </Link>
            ) : null}
          </div>
        </div>
      )}
      <div className={classes.tabs}>
        <button
          onClick={() => handleTabClick("events")}
          className={activeTab === "events" ? classes.activetab : classes.tab}
        >
          My Events
        </button>
        <button
          className={
            activeTab === "participants" ? classes.activetab : classes.tab
          }
          onClick={() => handleTabClick("participants")}
        >
          Participating
        </button>
      </div>

      {activeTab === "events" && (
        <div className={classes.grid}>
          {isLoading
            ? creatorEvents.map((creatorEvent) => (
                <EventsContent key={creatorEvent._id} />
              ))
            : creatorEvents.map((creatorEvent) => (
                <Post
                  key={creatorEvent._id}
                  description={creatorEvent.description}
                  image={creatorEvent.image}
                  date={format(new Date(creatorEvent.date), "d MMM - h:mm ")}
                  name={creatorEvent.creator.name}
                  location={creatorEvent.location}
                  eventName={creatorEvent.eventName}
                  id={creatorEvent._id}
                  participants={creatorEvent.participants?.length}
                  View={
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/SingleEvent/${creatorEvent._id}`}
                    >
                      <Button
                        btnText="View Single Event"
                        type={ButtonTypes.CREATE}
                      />
                    </Link>
                  }
                />
              ))}
        </div>
      )}

      {activeTab === "participants" && (
        <div className={classes.grid}>
          {isLoading
            ? participantEvents.map((participantEvent) => (
                <EventsContent key={participantEvent._id} />
              ))
            : participantEvents.map((participantEvent) => (
                <Post
                  key={participantEvent._id}
                  description={participantEvent.description}
                  image={participantEvent.image}
                  date={format(
                    new Date(participantEvent.date),
                    "d MMM - h:mm "
                  )}
                  participants={participantEvent.participants?.length}
                  location={participantEvent.location}
                  eventName={participantEvent.eventName}
                  id={participantEvent._id}
                  name={
                    participantEvent.creator && participantEvent.creator.name
                      ? participantEvent.creator.name
                      : "No creator available"
                  }
                  View={
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/SingleEvent/${participantEvent._id}`}
                    >
                      <Button
                        btnText="View Single Event"
                        type={ButtonTypes.CREATE}
                      />
                    </Link>
                  }
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default SingleUser;
