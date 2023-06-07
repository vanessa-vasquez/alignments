import React from "react";

export default function StaticDot({ left, top, name }) {
  return (
    <div className="friend-container">
      <div
        className="friend-dot"
        style={{
          left: `${left}%`,
          top: `${top}%`,
        }}
      ></div>
      <div
        className="friend-name"
        style={{
          left: `${left}%`,
          top: `${top}%`,
        }}
      >
        {name}
      </div>
    </div>
  );
}
