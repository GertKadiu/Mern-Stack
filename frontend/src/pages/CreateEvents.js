import { Alert } from "../components/Alert";
import MultipleSelect from "../components/Selecter";
import Input from "../components/Input";
import Calendar from "../components/Calendar";
import { Link } from "react-router-dom";
import classes from "./CreateEvents.module.css";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Modal from "../components/Modal/Modal";
import ClipLoader from "react-spinners/ClipLoader";
import { CreatePost } from "../hooks/Action";
import Image from "../components/Image";
import UploadStatus from "../components/UploadPerc";
import ArrowIcon from "../components/ArrowIcon";

const EventCreationForm = () => {
  const {
    formIsValid,
    createEvent,
    onConfirm,
    stay,
    onCancel,
    description,
    descriptionBlurHandler,
    descriptionChangeHandler,
    descriptionInputHasError,
    handleParticipantsChange,
    participants,
    location,
    locationBlurHandler,
    locationChangeHandler,
    locationInputHasError,
    eventName,
    eventNameBlurHandler,
    eventNameChangeHandler,
    eventNameInputHasError,
    dateError,
    isLoading,
    filePerc,
    setFile,
    setDate,
    fileUploadError,
    image,
    date,
    showModal,
    success,
    dateDoesntExist,
  } = CreatePost();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/Events">
            <ArrowIcon as={Link} to="/Events" />
          </Link>
        }
      >
        Create Event
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>Event created succesfully</Alert>}
        <div style={{ height: "40px" }}></div>
        {image ? (
          <div className={classes.place}>
            <img src={image} alt="Selected" className={classes.img} />
          </div>
        ) : null}
        <Image onChange={(e) => setFile(e.target.files[0])} />
        <UploadStatus fileUploadError={fileUploadError} filePerc={filePerc} />
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Event Name"
              type="text"
              variant="filled"
              id="EventName"
              name="EventName"
              IsUsername
              value={eventName}
              onChange={eventNameChangeHandler}
              onBlur={eventNameBlurHandler}
              error={eventNameInputHasError}
              errortext="Event Name is Require"
              required
            />
          </div>
          <div className={classes.EventLocation}>
            <Input
              IsUsername
              variant="filled"
              label="Event Location"
              type="text"
              value={location}
              onChange={locationChangeHandler}
              onBlur={locationBlurHandler}
              error={locationInputHasError}
              errortext="Location is Require"
              required
            />
          </div>
        </div>
        <div className={classes.inputs}>
          <div className={classes.Creator}>
            <MultipleSelect
              onChange={handleParticipantsChange}
              value={participants}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "16px",
            }}
          >
            <Calendar onChange={(newTime) => setDate(newTime)} value={date} />
            {dateError && (
              <p className={classes.error}>Event date cannot be in the past.</p>
            )}
            {dateDoesntExist && (
              <p className={classes.error}>Event date doesn't exist.</p>
            )}
          </div>
        </div>
        <div className={classes.input}>
          <div className={classes.selecter}>
            <Input
              ISDescription
              variant="filled"
              label="Description"
              value={description}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              error={descriptionInputHasError}
              errortext="Description is Require"
              required
            />
          </div>
        </div>
        <div className={classes.inputs}>
          <Button
            type={ButtonTypes.CANCEL}
            btnText="Cancel"
            onClick={onCancel}
          />
          <Button
            onClick={createEvent}
            type={formIsValid ? ButtonTypes.SAVE : ButtonTypes.DISABLED}
            btnText={
              isLoading ? (
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Create"
              )
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal
          type="Are you sure you want to leave this page?"
          confirm="Continue"
          cancel="Cancel"
          onDelete={onConfirm}
          onCancel={stay}
          IsConfirm
        >
          All your changes will not be saved!
        </Modal>
      )}
    </div>
  );
};

export default EventCreationForm;
