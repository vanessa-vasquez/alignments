import React, { useState, useEffect, useRef } from "react";
import "./Main.css";
import Dot from "./Dot";
import Quadrant from "./Quadrant";
import { Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { database } from "../firebase.js";
import { ref, child, get, set } from "firebase/database";
import StaticDot from "./StaticDot";

const SITE_NAME = "alignments.glitch.me";
export default function Chart() {
  const [moveCursor, setMoveCursor] = useState(true);
  const [data, setData] = useState({});
  const [friends, setFriends] = useState({});
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [copied, setCopied] = useState(false);
  const [disableEditing, setDisableEditing] = useState(false);
  const [name, setName] = useState("click me to enter your name");

  const containerGrid = useRef(null);

  const path = window.location.pathname.substring(1);
  const dataLink = "alignments.glitch.me" + window.location.pathname;

  useEffect(() => {
    get(child(ref(database), `charts/${path}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(ref(database), `charts/${path}/users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFriends(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [path]);

  const handleMouseMove = (e) => {
    if (moveCursor) {
      const [gridOffsetX, gridOffsetY] = [
        containerGrid.current.parentElement.offsetLeft,
        containerGrid.current.parentElement.offsetTop,
      ];
      setCursorX(e.clientX - gridOffsetX);
      setCursorY(e.clientY - gridOffsetY);
    }
  };

  const handleClick = (e) => {
    const [gridOffsetX, gridOffsetY] = [
      containerGrid.current.offsetLeft,
      containerGrid.current.offsetTop,
    ];
    setMoveCursor(false);
    if (!moveCursor) {
      setDisableEditing(true);
      //submit
      set(ref(database, `charts/${path}/users/${name}`), {
        left:
          ((cursorX - gridOffsetX) / containerGrid.current.clientWidth) * 100,
        top:
          ((cursorY - gridOffsetY) / containerGrid.current.clientHeight) * 100,
      });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Box display={{ xs: "block", sm: "block", md: "none" }}>
          <div className="header title">
            <Link to="/">{SITE_NAME}</Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={3} md={3}>
        <Box display={{ xs: "none", sm: "none", md: "block" }}>
          <div className="header title">
            <Link to="/">{SITE_NAME}</Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={6} md={6}>
        <div className="copy-header">
          <div className="link">{dataLink}</div>
          <div>
            <Button
              color="custom"
              variant="contained"
              size="medium"
              onClick={() => {
                navigator.clipboard.writeText(dataLink);
                setCopied(true);
              }}
            >
              {copied ? "copied!" : "copy"}
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={3} md={3}></Grid>
      <Grid item xs={3} md={3} className="x-input x-left">
        <div className="final-x-axis">{data.left}</div>
      </Grid>
      <Grid item xs={6} md={6} className="chart">
        <Dot
          left={cursorX}
          top={cursorY}
          active={moveCursor}
          path={path}
          name={name}
          gridRef={containerGrid}
          setName={setName}
          disableEditing={disableEditing}
          setDisableEditing={setDisableEditing}
        />
        <div className="final-y-axis">{data.top}</div>
        <div
          ref={containerGrid}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          {Object.keys(friends).map((key) => {
            return (
              <StaticDot
                left={friends[key]["left"]}
                top={friends[key]["top"]}
                name={key}
              />
            );
          })}
          <div className="upper">
            <Quadrant position={1} />
            <Quadrant position={2} />
          </div>
          <div className="lower">
            <Quadrant position={3} />
            <Quadrant position={4} />
          </div>
        </div>

        <div className="final-y-axis">{data.bottom}</div>
      </Grid>
      <Grid item xs={3} md={3} className="x-input x-right">
        <div className="final-x-axis">{data.right}</div>
      </Grid>
    </Grid>
  );
}
