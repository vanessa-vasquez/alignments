import React, { useState } from "react";
import { Box } from "@mui/material";

export default function Dot({
  left,
  top,
  active,
  name,
  setName,
  disableEditing,
  setDisableEditing,
}) {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setDisableEditing(true);
      //submit
    }
  };

  return (
    <>
      <Box display={{ xs: "none", md: "block" }}>
        <div
          className="dot"
          style={{
            left: `${(left / window.innerWidth) * 100}%`,
            top: `${(top / window.innerHeight) * 100}%`,
          }}
        ></div>
        {active ? (
          <div
            className="active-text"
            style={{
              left: `${(left / window.innerWidth) * 100}%`,
              top: `${(top / window.innerHeight) * 100}%`,
            }}
          >
            place yourself on the chart
          </div>
        ) : (
          <div
            className="inactive-text"
            style={{
              left: `${(left / window.innerWidth) * 100}%`,
              top: `${(top / window.innerHeight) * 100}%`,
            }}
          >
            <input
              readOnly={disableEditing}
              onKeyDown={handleEnter}
              className="inactive-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
      </Box>
      <Box display={{ xs: "block", md: "none" }}>
        <div className="placement-container">
          <div className="static-dot"></div>
          <div className="placement-text">place yourself on the chart</div>
        </div>
        {!active && (
          <>
            <div
              className="dot"
              style={{
                left: `${(left / window.innerWidth) * 100}%`,
                top: `${(top / window.innerHeight) * 100}%`,
              }}
            ></div>
            <div
              className="inactive-text"
              style={{
                left: `${(left / window.innerWidth) * 100}%`,
                top: `${(top / window.innerHeight) * 100}%`,
              }}
            >
              <input
                readOnly={disableEditing}
                onKeyDown={handleEnter}
                className="inactive-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </>
        )}
      </Box>
    </>
  );
}
