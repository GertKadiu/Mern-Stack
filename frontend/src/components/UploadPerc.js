import React from "react";

const UploadStatus = ({ fileUploadError, filePerc }) => {
  return (
    <p style={{ fontSize: "0.875rem", textAlign: "center" }}>
      {fileUploadError ? (
        <span style={{ color: "#EF4444" }}>
          Error Image upload (image must be less than 2 mb)
        </span>
      ) : filePerc > 0 && filePerc < 100 ? (
        <span style={{ color: "#6B7280" }}>{`Uploading ${filePerc}%`}</span>
      ) : filePerc === 100 ? (
        <span style={{ color: "#10B981" }}>Image successfully uploaded!</span>
      ) : (
        ""
      )}
    </p>
  );
};

export default UploadStatus;
