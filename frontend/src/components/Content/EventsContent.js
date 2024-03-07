import ContentLoader from "react-content-loader";
import classes from "./EventsContent.module.css";

export const EventsContent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1E1D23",
      }}
    >
      <ContentLoader
        style={{
          marginBottom: "40px",
        }}
        height={120}
        speed={2}
        backgroundColor={"#666666"}
        foregroundColor={"#999"}
      >
        <rect x="0" y="0" rx="5" ry="5" width="344" height="160" />
      </ContentLoader>
      <ContentLoader
        style={{ marginLeft: "10px", gap: "15px" }}
        speed={2}
        width={340}
        height={180}
        backgroundColor={"#666666"}
        foregroundColor={"#999"}
      >
        <rect x="0" y="0" rx="3" ry="3" width="200" height="17" />
        <rect x="0" y="30" rx="3" ry="3" width="200" height="17" />
        <rect x="0" y="60" rx="3" ry="3" width="200" height="17" />
        <rect x="0" y="90" rx="3" ry="3" width="260" height="17" />
      </ContentLoader>
      <ContentLoader
        style={{ marginLeft: "10px", gap: "15px" }}
        speed={2}
        width={340}
        height={70}
        backgroundColor={"#666666"}
        foregroundColor={"#999"}
      >
        <rect x="0" y="0" rx="3" ry="3" width="150" height="17" />
        <rect x="0" y="30" rx="3" ry="3" width="320" height="20" />
      </ContentLoader>
    </div>
  );
};

export const HomeContentLoader = () => {
  return (
    <div className={classes.background}>
      <ContentLoader
        style={{ marginTop: "30px", marginLeft: "10px" }}
        height={100}
        speed={2}
        backgroundColor={"#666666"}
        foregroundColor={"#999"}
      >
        <rect x="0" y="0" rx="50" ry="50" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="70" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
      </ContentLoader>
    </div>
  );
};

export const SingleEventContent = ({ type }) => {
  let loader = null;
  switch (type) {
    case "about":
      loader = (
        <ContentLoader
          height={44}
          width={"100%"}
          speed={2}
          backgroundColor={"#666666"}
          foregroundColor={"#999"}
        >
          <rect x="00" y="11" rx="4" ry="4" width="80" height="8" />
        </ContentLoader>
      );
      break;
    case "description":
      loader = (
        <ContentLoader
          height={44}
          width={"100%"}
          speed={2}
          backgroundColor={"#666666"}
          foregroundColor={"#999"}
        >
          <rect x="00" y="11" rx="4" ry="4" width="650" height="8" />
        </ContentLoader>
      );
      break;
    case "participant":
      loader = (
        <ContentLoader
          height={44}
          width={"100%"}
          speed={2}
          backgroundColor={"#666666"}
          foregroundColor={"#999"}
        >
          <rect x="0" y="0" rx="50" ry="50" width="32" height="32" />
          <rect x="40" y="11" rx="4" ry="4" width="90" height="8" />
          <rect x="0" y="38" rx="3" ry="3" width="490" height="1" />
        </ContentLoader>
      );
      break;
    default:
      loader = (
        <ContentLoader
          height={44}
          width={"100%"}
          speed={2}
          backgroundColor={"#666666"}
          foregroundColor={"#999"}
        >
          <rect x="0" y="0" rx="50" ry="50" width="42" height="42" />
          <rect x="60" y="15" rx="4" ry="4" width="90" height="8" />
        </ContentLoader>
      );
  }
  return loader;
};
