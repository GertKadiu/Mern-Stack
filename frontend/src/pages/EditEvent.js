import classes from "./EditEvent.module.css";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import MultipleSelect from "../components/Selecter";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Title from "../components/Title/Title";
import Modal from "../components/Modal/Modal";
import { Alert } from "../components/Alert";
import { ClipLoader } from "react-spinners";
import { UpdatePost } from "../hooks/Action";
import Image from "../components/Image";
import UploadStatus from "../components/UploadPerc";
import ArrowIcon from "../components/ArrowIcon";

const EditEvent = () => {
  const {
    image,
    EditPost,
    onConfirm,
    stay,
    onCancel,
    handleParticipantsChange,
    participants,
    location,
    setEventName,
    setLocation,
    eventName,
    isLoading,
    filePerc,
    setFile,
    fileUploadError,
    showModal,
    description,
    setDescription,
    success,
  } = UpdatePost();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/Events">
            <ArrowIcon />
          </Link>
        }
      >
        Edit Event
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>Event updated successfully</Alert>}
        <div style={{ height: "20px" }}></div>
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
              id="EventName"
              name="EventName"
              IsUsername
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              errortext="Event Name is Require"
              required
            />
          </div>
          <div className={classes.EventLocation}>
            <Input
              IsUsername
              label="Event Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
        </div>
        <div className={classes.input}>
          <div className={classes.selecter}>
            <Input
              ISDescription
              variant="filled"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            onClick={EditPost}
            type={ButtonTypes.SAVE}
            btnText={
              isLoading ? (
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Save"
              )
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal
          confirm="Leave"
          cancel="Stay"
          type="Leave Edit Page"
          onDelete={onConfirm}
          onCancel={stay}
          IsConfirm
        >
          Are u sure u want to leave this page?
        </Modal>
      )}
    </div>
  );
};

export default EditEvent;
