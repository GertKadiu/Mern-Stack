import ContentLoader from "react-content-loader";

export const profileContent = () => {
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
  </ContentLoader>;
};
