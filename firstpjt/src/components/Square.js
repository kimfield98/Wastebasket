import React from "react";

const squareStyle = {
  width: "100px",
  height: "100px",
  border: "1px solid green",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const Square = ({ children }) => {
  return <div style={squareStyle}>{children}</div>;
};

export default Square;
