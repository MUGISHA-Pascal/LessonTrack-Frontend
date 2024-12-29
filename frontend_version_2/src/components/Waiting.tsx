import React from "react";
import waitingImage from "../assets/waiting.png";
const Waiting = () => {
  return (
    <div className="flex flex-row items-center h-full justify-center">
      <img
        src={waitingImage}
        className="w-[300px] h-auto"
        alt="waiting image"
      />
    </div>
  );
};

export default Waiting;
