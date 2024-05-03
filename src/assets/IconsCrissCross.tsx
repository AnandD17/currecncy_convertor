import React from "react";

type Props = {
  color?: string;
};

const IconsCrissCross = (props: Props) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L13 4M13 4L10 7M13 4L1 4"
        stroke={props.color || "black"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 15L1 12M1 12L4 9M1 12L13 12"
        stroke={props.color || "black"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconsCrissCross;
