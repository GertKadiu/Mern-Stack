import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "./usersSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import useInput from "./use-inpute";
import { storage } from "../firebase";

const initialState = {
  image: "",
  location: "",
  eventName: "",
  description: "",
  date: [],
  participants: [],
  showModal: false,
  fileUploadError: false,
  success: false,
  dateError: false,
  dateDoesntExist: false,
  isLoading: false,
  file: undefined,
  filePerc: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_FILE_UPLOAD_ERROR":
      return { ...state, fileUploadError: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_FILE_PERC":
      return { ...state, filePerc: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_DATE_ERROR":
      return { ...state, dateError: action.payload };
    case "SET_DATE_DOESNT_EXIST":
      return { ...state, dateDoesntExist: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_EVENTNAME":
      return { ...state, eventName: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };

    default:
      return state;
  }
};

export const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    image,
    success,
    participants,
    showModal,
    fileUploadError,
    file,
    filePerc,
    date,
    dateError,
    dateDoesntExist,
    isLoading,
  } = state;

  const {
    value: eventName,
    hasError: eventNameInputHasError,
    isValid: eventNameIsValid,
    valueChangeHandler: eventNameChangeHandler,
    InputBlurHandler: eventNameBlurHandler,
  } = useInput((value) => value.trim().length > 2);

  const {
    value: location,
    hasError: locationInputHasError,
    isValid: locationIsValid,
    valueChangeHandler: locationChangeHandler,
    InputBlurHandler: locationBlurHandler,
  } = useInput((value) => value.trim().length > 4);

  const {
    value: description,
    hasError: descriptionInputHasError,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    InputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value.trim().length <= 220);

  const onCancel = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: true });
  };

  const onConfirm = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
    navigate("/Events");
  };

  const stay = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
  };

  const handleParticipantsChange = (event) => {
    const selectedParticipants = event.target.value;
    dispatch({ type: "SET_PARTICIPANTS", payload: selectedParticipants });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: "SET_FILE_PERC", payload: Math.round(progress) });
      },
      (error) => {
        console.error("Error uploading image:", error);
        dispatch({ type: "SET_FILE_UPLOAD_ERROR", payload: true });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          dispatch({ type: "SET_IMAGE", payload: downloadURL })
        );
      }
    );
  };

  const formIsValid = locationIsValid && descriptionIsValid && eventNameIsValid;

  const createEvent = async (e) => {
    e.preventDefault();
    const currentDate = dayjs();
    if (dayjs(date).isBefore(currentDate, "day")) {
      console.error(
        "Error creating event:",
        "Event date cannot be in the past."
      );
      dispatch({ type: "SET_DATE_ERROR", payload: true });
      return;
    }

    if (!dayjs(date).isValid()) {
      console.error("Error creating event:", "Invalid date selected.");
      dispatch({ type: "SET_DATE_DOESNT_EXIST", payload: true });
      return;
    }

    try {
      const formData = {
        eventName,
        description,
        participants,
        image: image,
        creator: currentUser._id,
        location,
        date,
      };

      const res = await axios.post(
        `https://mern-kzu7.onrender.com/CreateEvents`,
        formData
      );
      const data = res.data;
      dispatch({ type: "SET_IS_LOADING", payload: true });
      if (data.success === false) {
        console.error("Error creating event:", data.message);
        return;
      }
      dispatch({ type: "SET_IS_LOADING", payload: true });
      dispatch({ type: "SET_SUCCESS", payload: true });
      setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_IS_LOADING", payload: false });
        navigate("/Events");
      }, 500);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return {
    image,
    date,
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
    setFile: (file) => dispatch({ type: "SET_FILE", payload: file }),
    setDate: (date) => dispatch({ type: "SET_DATE", payload: date }),
    fileUploadError,
    showModal,
    success,
    dateDoesntExist,
  };
};

export const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    image,
    success,
    participants,
    showModal,
    fileUploadError,
    file,
    filePerc,
    isLoading,
    location,
    eventName,
    description,
  } = state;

  const onCancel = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: true });
  };

  const onConfirm = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
    navigate("/Events");
  };

  const stay = () => {
    dispatch({ type: "SET_SHOW_MODAL", payload: false });
  };

  const handleInputChange = (type) => (value) => {
    dispatch({ type, payload: value });
  };

  const handleParticipantsChange = (event) => {
    handleInputChange("SET_PARTICIPANTS")(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://mern-kzu7.onrender.com/getPost/" + id)
      .then((result) => {
        console.log(result);
        dispatch({ type: "SET_EVENTNAME", payload: result.data.eventName });
        dispatch({ type: "SET_LOCATION", payload: result.data.location });
        dispatch({ type: "SET_DESCRIPTION", payload: result.data.description });
        dispatch({
          type: "SET_PARTICIPANTS",
          payload: result.data.participants,
        });
        dispatch({ type: "SET_IMAGE", payload: result.data.image });
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (state.file) {
      handleFileUpload(state.file);
    }
  }, [state.file]);

  const handleFileUpload = (file) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: "SET_FILE_PERC", payload: Math.round(progress) });
      },
      (error) => {
        console.error("Error uploading image:", error);
        dispatch({ type: "SET_FILE_UPLOAD_ERROR", payload: true });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          dispatch({ type: "SET_IMAGE", payload: downloadURL })
        );
      }
    );
  };

  const EditPost = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        eventName,
        description,
        participants,
        image,
        location,
      };

      const res = await axios.put(
        `https://mern-kzu7.onrender.com/editEvent/${id}`,
        formData
      );
      const data = res.data;

      if (data.success === false) {
        console.error("Error updating user:", data.message);
        return;
      }
      dispatch({ type: "SET_IS_LOADING", payload: true });
      dispatch({ type: "SET_SUCCESS", payload: true });
      setTimeout(() => {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_IS_LOADING", payload: false });
        navigate("/events");
      }, 500);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return {
    image,
    setImage: handleInputChange("SET_IMAGE"),
    eventName,
    setEventName: handleInputChange("SET_EVENTNAME"),
    file,
    setFile: handleInputChange("SET_FILE"),
    location,
    setLocation: handleInputChange("SET_LOCATION"),
    description,
    setDescription: handleInputChange("SET_DESCRIPTION"),
    participants,
    handleParticipantsChange,
    isLoading,
    filePerc,
    fileUploadError,
    showModal,
    success,
    onConfirm,
    stay,
    onCancel,
    EditPost,
  };
};

export const UpdateUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const { handleDelete } = DeleteUser();

  const getUser = "https://mern-kzu7.onrender.com/getUser/" + id;

  useEffect(() => {
    axios
      .get(getUser)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setImage(result.data.image);
      })
      .catch((err) => console.log(err));
  }, [getUser]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Error uploading image:", error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setImage(downloadURL)
        );
      }
    );
  };

  const EditUser = async (e) => {
    const updateUser = `https://mern-kzu7.onrender.com/updateUser/${currentUser._id}`;

    e.preventDefault();
    try {
      const formData = {
        name,
        email,
        age,
        image,
      };

      const res = await axios.put(updateUser, formData);
      const data = res.data;

      if (data.success === false) {
        console.error("Error updating user:", data.message);
        return;
      }

      setIsLoading(true);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsLoading(false);
        navigate("/home");
      }, 500);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onCancel = () => {
    setShowModal(true);
  };

  const onConfirm = () => {
    setShowModal(false);
    navigate("/home");
  };

  const stay = () => {
    setShowModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return {
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
    image,
    isLoading,
    showModal,
    onCancel,
    onConfirm,
    stay,
    closeModal,
  };
};

export const EventsHook = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://mern-kzu7.onrender.com/events")
      .then((result) => {
        setPosts(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredPostsBySearch = posts.filter((post) => {
    if (post.location && typeof post.location === "string") {
      return post.location.toLowerCase().includes(searchInput.toLowerCase());
    }
    return false;
  });

  const reversedPosts = [...filteredPostsBySearch].reverse();
  const numPages = Math.ceil(filteredPostsBySearch.length / postsPerPage);
  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = reversedPosts.slice(firstPostIndex, lastPostIndex);

  const handleCreateEvents = () => {
    navigate("/CreateEvents");
  };
  return {
    isLoading,
    numPages,
    currentPosts,
    posts,
    searchInput,
    currentPage,
    setCurrentPage,
    handleCreateEvents,
    handleInputChange,
  };
};

export const HomeHook = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const apiUrl = "https://mern-kzu7.onrender.com/";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((result) => {
        setUsers(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredPostsBySearch = users.filter((user) => {
    if (user && user.name) {
      return user.name.toLowerCase().includes(searchInput.toLowerCase());
    }
    return false;
  });

  const reversedPosts = [...filteredPostsBySearch].reverse();
  const numPages = Math.ceil(filteredPostsBySearch.length / usersPerPage);
  const LastUser = currentPage * usersPerPage;
  const FirstUser = LastUser - usersPerPage;
  const currentUsers = reversedPosts.slice(FirstUser, LastUser);

  const navigateToCurrentUserId = () => {
    navigate(`/Update/${currentUser._id}`);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return {
    navigateToCurrentUserId,
    isLoading,
    users,
    currentUsers,
    numPages,
    setCurrentPage,
    setSearchInput,
    searchInput,
    currentPage,
    handleInputChange,
  };
};

export const SingleUserEvents = () => {
  const [creatorEvents, setCreatorEvents] = useState([]);
  const [participantEvents, setParticipantEvents] = useState([]);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("events");
  const [isLoading, setIsLoading] = useState([]);

  const fetchPostsByCreator = (creator) => {
    axios
      .get(`https://mern-kzu7.onrender.com/PostsByCreator/${creator}`)
      .then((result) => {
        setCreatorEvents(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  };

  const fetchParticipantEvents = (participantId) => {
    axios
      .get(`https://mern-kzu7.onrender.com/EventsByParticipant/${participantId}`)
      .then((result) => setParticipantEvents(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (activeTab === "events") {
      fetchPostsByCreator(id);
    } else if (activeTab === "participants") {
      fetchParticipantEvents(id);
    }
  }, [id, activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return {
    creatorEvents,
    handleTabClick,
    activeTab,
    participantEvents,
    id,
    isLoading,
  };
};

export const Signout = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("https://mern-kzu7.onrender.com/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(error.message));
      }
      dispatch(signOutUserSuccess(data));
      navigate("/login");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return { handleSignOut };
};

export const DeleteUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mern-kzu7.onrender.com/deleteUser/${id}`);
      dispatch(signOutUserStart());
      const res = await fetch("https://mern-kzu7.onrender.com/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(error.message));
      }
      dispatch(signOutUserSuccess(data));
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user and associated posts:", error);
    }
  };

  return { handleDelete };
};

export const SingleEventHook = () => {
  const [singleEvent, setSingleEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const apiUrl = `https://mern-kzu7.onrender.com/SingleEvent/${id}`;
  const deleteApi = "https://mern-kzu7.onrender.com/deletePost/" + deleteId;

  const openModal = () => {
    setShowLikeModal(true);
  };

  const closeModal = () => {
    setShowLikeModal(false);
  };

  const closeModalCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((result) => {
        setSingleEvent(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch((err) => console.log(err));
  }, [apiUrl]);

  function isValidDate(date) {
    return !isNaN(Date.parse(date));
  }

  const confirmDelete = () => {
    axios
      .delete(deleteApi)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        navigate("/Events");
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePost = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const backgroundStyle = {
    minHeight: "525px",
    backgroundImage: `linear-gradient(180deg, #1E1D2300, #16161B),
    url(${process.env.PUBLIC_URL + singleEvent.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    position: "relative",
  };

  return {
    closeModal,
    closeModalCancel,
    confirmDelete,
    isValidDate,
    showLikeModal,
    id,
    isLoading,
    currentUser,
    openModal,
    handleDeletePost,
    singleEvent,
    showModal,
    backgroundStyle
  };
};

export const ManageLikes = ({ entityId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likingUsers, setLikingUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`https://mern-kzu7.onrender.com/allLikes/${entityId}`)
      .then((result) => {
        const likesCount = result.data.length;
        setLikes(likesCount);
        if (result.data.includes(currentUser._id)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://mern-kzu7.onrender.com/likedUsers/${entityId}`)
      .then((result) => {
        setLikingUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, [entityId, currentUser._id]);

  const like = () => {
    axios
      .put(`https://mern-kzu7.onrender.com/like/${entityId}`, {
        userId: currentUser._id,
      })
      .then((response) => {
        setLiked(true);
        setLikes(response.data.likes.length);
      })
      .catch((error) => {
        console.error("Error liking entity:", error);
      });
  };

  const unlike = () => {
    axios
      .put(`https://mern-kzu7.onrender.com/unlike/${entityId}`, {
        userId: currentUser._id,
      })
      .then((response) => {
        setLiked(false);
        setLikes(response.data.likes.length);
      })
      .catch((error) => {
        console.error("Error unliking entity:", error);
      });
  };

  const handleLikeEvent = () => {
    if (liked) {
      unlike();
    } else {
      like();
    }
  };

  return { handleLikeEvent, liked, likes, likingUsers };
};
