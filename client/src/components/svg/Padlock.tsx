import React from "react";

function Padlock() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <g
        stroke="#AA2C36"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        clipPath="url(#clip0_71_2591)"
      >
        <path d="M11.875 6.875h-8.75c-.69 0-1.25.56-1.25 1.25V12.5c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25V8.125c0-.69-.56-1.25-1.25-1.25zM4.375 6.875v-2.5a3.125 3.125 0 016.188-.625"></path>
      </g>
      <defs>
        <clipPath id="clip0_71_2591">
          <path fill="#fff" d="M0 0H15V15H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Padlock;