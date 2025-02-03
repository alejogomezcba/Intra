import * as React from "react";
const squareSVG = (props) => (
  <svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M 6 6 L 6 26 L 26 26 L 26 6 L 6 6 z" />
  </svg>
);
export default squareSVG;