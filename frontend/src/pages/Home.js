import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PaginationRounded from "../components/Pagination/Pagination";
import Navbar from "../components/Navbar";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { HomeHook } from "../hooks/Action";
import { HomeContentLoader } from "../components/Content/EventsContent";
import SecondTitle from "../components/SecondTitle";

const Home = () => {
  const {
    navigateToCurrentUserId,
    isLoading,
    users,
    currentUsers,
    numPages,
    setCurrentPage,
    searchInput,
    currentPage,
    handleInputChange,
  } = HomeHook();

  return (
    <div className={classes.contanier}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <SecondTitle
        onChange={handleInputChange}
        onClick={() => navigateToCurrentUserId()}
        value={searchInput}
        Text="+Update Profile"
        Text2="All Profiles"
        countUsers={users.length}
      />
      <div className={classes.wrapProfile}>
        {isLoading
          ? currentUsers.map((User) => <HomeContentLoader key={User._id} />)
          : currentUsers.map((User) => (
              <div key={User._id} className={classes.background}>
                <Avatar
                  as={Link}
                  to={`/SingleUser/${User._id}`}
                  style={{
                    height: "60px",
                    width: "60px",
                    marginRight: "16px",
                    marginLeft: "20px",
                  }}
                  src={User.image}
                />
                <div className={classes.name}>
                  <Link to={`/SingleUser/${User._id}`} className={classes.link}>
                    {User.name}
                  </Link>
                  <div className={classes.email}> {User.email}</div>
                </div>
                <Link to={`/SingleUser/${User._id}`} className={classes.icon}>
                  <PlayArrowRoundedIcon />
                </Link>
              </div>
            ))}
      </div>
      <PaginationRounded
        totalUsers={numPages}
        usersPerPage={1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default Home;
