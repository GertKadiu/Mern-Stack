import React from 'react'

function Image(props) {
  return (
    <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
            marginTop: "10px",
          }}
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            id="imageInput"
            onChange={props.onChange}
          />
          <label
            htmlFor="imageInput"
            style={{
              cursor: "pointer",
              color: "#026CDF",
              textDecoration: "underline",
            }}
          >
            Choose Image
          </label>
        </div>
  );
}

export default Image;