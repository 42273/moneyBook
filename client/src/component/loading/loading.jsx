import React from "react";
import RingLoader from "react-spinners/RingLoader";

function Loading() {
  
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <RingLoader
          color="rgb(147,0,0)"
          height={15}
          width={5}
          radius={2}
          margin={2}
          speedMultiplier={2}
          size={200}
        />
      </div>
    </div>
  );
}

export default Loading;