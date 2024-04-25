// ScreenShareSender.js
import React, { useState } from "react";

const ScreenShareSender = ({ peer }) => {
  const [screenStream, setScreenStream] = useState(null);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      setScreenStream(stream);
      peer.addStream(stream);
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  return (
    <div>
      <button onClick={startScreenShare}>Start Screen Share</button>
    </div>
  );
};

export default ScreenShareSender;
