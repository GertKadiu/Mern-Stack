import Input from "../components/Input";
import classes from "./Edit.module.css";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Image from "../components/Image";
import Modal from "../components/Modal/Modal";
import { ClipLoader } from "react-spinners";
import { UpdateUser } from "../hooks/Action";
import UploadStatus from "../components/UploadPerc";
import ArrowIcon from "../components/ArrowIcon";

const ContactForm = () => {
  const {
    EditUser,
    fileUploadError,
    confirmDelete,
    filePerc,
    setFile,
    showDeleteModal,
    openDeleteModal,
    success,
    name,
    setName,
    age,
    setAge,
    email,
    setEmail,
    closeModal,
    image,
    isLoading,
    showModal,
    onCancel,
    onConfirm,
    stay,
  } = UpdateUser();

  

  return (
    <div className={classes.contanier}>
      <div className={classes.title}>
        <Link to="/home">
          <ArrowIcon />
        </Link>
        <h1>Edit Profile</h1>
        <Button
          type={ButtonTypes.DELETE}
          btnText="Delete User"
          onClick={openDeleteModal}
        />
      </div>
      {showDeleteModal && (
        <Modal
          type="Confirm Delete"
          confirm="Confirm"
          cancel="Cancel"
          onCancel={closeModal}
          onDelete={confirmDelete}
        >
          Are you sure you want to delete this User?
        </Modal>
      )}
      <div className={classes.contanier2}>
        {success && <Alert>Event created succesfully</Alert>}
        <div className={classes.avatar}>
          <Avatar
            src={image}
            style={{
              height: "120px",
              width: "120px",
              margin: "20px 24px 30px 0",
            }}
          />
          <Image onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <UploadStatus fileUploadError={fileUploadError} filePerc={filePerc} />
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Name"
              type="text"
              variant="filled"
              id="name"
              name="name"
              IsUsername
              value={name}
              onChange={(e) => setName(e.target.value)}
              errortext="Name is Required"
            />
          </div>
          <div style={{ width: "312px" }}>
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              inputType="email"
              IsUsername
              type="email"
              errortext="Email includes '@!"
            />
          </div>
        </div>
        <div className={classes.input}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Age"
              IsUsername
              className="input"
              variant="filled"
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              errortext="Invalid Age"
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
            onClick={EditUser}
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
          Are you sure you want to leave this page?
        </Modal>
      )}
    </div>
  );
};

export default ContactForm;
