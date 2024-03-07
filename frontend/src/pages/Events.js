import classes from "./Events.module.css";
import { Link } from "react-router-dom";
import PaginationRounded from "../components/Pagination/Pagination";
import { format } from "date-fns";
import Post from "../components/Post/Post";
import Navbar from "../components/Navbar";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import { EventsContent } from "../components/Content/EventsContent";
import { EventsHook } from "../hooks/Action";
import SecondTitle from "../components/SecondTitle";

const EventPage = () => {
  const {
    isLoading,
    numPages,
    currentPosts,
    posts,
    searchInput,
    currentPage,
    setCurrentPage,
    handleCreateEvents,
    handleInputChange,
  } = EventsHook();

  return (
    <div className={classes.contanier}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <SecondTitle
        onChange={handleInputChange}
        onClick={() => handleCreateEvents()}
        value={searchInput}
        Text2="Upcoming Events"
        Text="+ Create Event"
        countPost={posts.length}
      />
      <div className={classes.grid}>
        {isLoading
          ? currentPosts.map((post) => <EventsContent key={post._id} />)
          : currentPosts.map((post) => (
              <Post
                key={post._id}
                image={post.image}
                location={post.location}
                participants={post.participants?.length}
                description={post.description}
                date={format(new Date(post.date), "d MMM - h:mm ")}
                name={post.creator ? post.creator.name : "No creator available"}
                eventName={post.eventName}
                id={post._id}
                View={
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/SingleEvent/${post._id}`}
                  >
                    <Button type={ButtonTypes.CREATE} btnText="View Event" />
                  </Link>
                }
              />
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

export default EventPage;
