import React from "react";
import { database } from "../firebase.js";
import { ref, set } from "firebase/database";
import { Box } from "@mui/material";

export default function Dot({
  left,
  top,
  active,
  gridRef,
  name,
  setName,
  error,
  setError,
  disableEditing,
  setDisableEditing,
}) {
  const path = window.location.pathname.substring(1);

  const handleEnter = (e) => {
    const [gridOffsetX, gridOffsetY] = [
      gridRef.current.offsetLeft,
      gridRef.current.offsetTop,
    ];
    if (e.key === "Enter" && name.trim() !== "") {
      setDisableEditing(true);
      //submit
      set(ref(database, `charts/${path}/users/${name}`), {
        left: ((left - gridOffsetX) / gridRef.current.clientWidth) * 100,
        top: ((top - gridOffsetY) / gridRef.current.clientHeight) * 100,
      });
    } else if (e.key === "Enter" && name.trim() === "") {
      setError(true);
    }
  };

  return (
    <>
      <Box display={{ xs: "none", md: "block" }}>
        <div
          className="dot"
          style={{
            left,
            top,
          }}
        ></div>
        {active ? (
          <div
            className="active-text"
            style={{
              left,
              top,
            }}
          >
            place yourself on the chart
          </div>
        ) : (
          <div
            className="inactive-text"
            style={{
              left: left,
              top: top,
            }}
          >
            <input
              readOnly={disableEditing}
              onKeyDown={handleEnter}
              className="inactive-input"
              type="text"
              placeholder={
                error
                  ? "please enter a valid name"
                  : "tap me to enter your name"
              }
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
                left,
                top,
              }}
            ></div>
            <div
              className="inactive-text"
              style={{
                left,
                top,
              }}
            >
              <input
                readOnly={disableEditing}
                onKeyDown={handleEnter}
                className="inactive-input"
                placeholder={
                  error
                    ? "please enter a valid name"
                    : "tap me to enter your name"
                }
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
