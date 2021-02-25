import React, { useState,useEffect } from 'react';
import { MessageType } from "../../types";
import "./Button.css";

export default function Button() {
  const [snowing, setSnowing] = useState(true);

  const onClick = () => {
    const isSnowing = !snowing;
    setSnowing(isSnowing);
    chrome.runtime.sendMessage({ type: "TOGGLE_SNOW", snowing: isSnowing });
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case "SNOW_STATUS":
          setSnowing(message.snowing);
          break;
        default:
          break;
      }
    });
  }, [])

  return (
    <div className="buttonContainer">
      <button className="snowButton" onClick={onClick}>
        {snowing ? "Disable the snow 🥶" : "Let it snow! ❄️"}
      </button>
    </div>
  );
};