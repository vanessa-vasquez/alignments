import React, { useState, useEffect } from "react";
import "./Chart.css";
import Dot from "./Dot";
import Quadrant from "./Quadrant";
import { Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { database } from "../firebase.js";

import { ref, child, get, set } from "firebase/database";
import StaticDot from "./StaticDot";

export default function Chart() {
  const [moveCursor, setMoveCursor] = useState(true);
  const [data, setData] = useState({});
  const [friends, setFriends] = useState({});
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [copied, setCopied] = useState(false);
  const [disableEditing, setDisableEditing] = useState(false);
  const [name, setName] = useState("click me to enter your name");
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [eleWidth, setEleWidth] = useState(0);
  const [eleHeight, setEleHeight] = useState(0);

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
      setCursorX(e.clientX - 324);
      setCursorY(e.clientY - 325);

      setOffsetX(e.target.offsetLeft);
      setOffsetY(e.target.offsetTop);

      setEleWidth(e.target.offsetWidth);
      setEleHeight(e.target.offsetHeight);
    }
  };

  const handleClick = (e) => {
    setMoveCursor(false);
    if (!moveCursor) {
      setDisableEditing(true);
      //submit
      set(ref(database, `charts/${path}/users/${name}`), {
        left: (cursorX / window.innerWidth) * 100,
        top: (cursorY / window.innerHeight) * 100,
      });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <Box display={{ xs: "block", sm: "block", md: "none" }}>
          <div className="header title">
            <Link to="/">alignments.glitch.me</Link>
          </div>
        </Box>
      </Grid>
      <Grid item xs={3} md={3}>
        <Box display={{ xs: "none", sm: "none", md: "block" }}>
          <div className="header title">
            <Link to="/">alignments.glitch.me</Link>
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
      <Grid
        item
        xs={6}
        md={6}
        className="chart"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <Dot
          left={cursorX}
          top={cursorY}
          active={moveCursor}
          path={path}
          name={name}
          setName={setName}
          disableEditing={disableEditing}
          setDisableEditing={setDisableEditing}
        />
        {Object.keys(friends).map((key) => {
          return (
            <StaticDot
              left={friends[key]["left"]}
              top={friends[key]["top"]}
              name={key}
            />
          );
        })}
        <div className="final-y-axis">{data.top}</div>
        <div className="upper">
          <Quadrant position={1} />
          <Quadrant position={2} />
        </div>
        <div className="lower">
          <Quadrant position={3} />
          <Quadrant position={4} />
        </div>
        <div className="final-y-axis">{data.bottom}</div>
      </Grid>
      <Grid item xs={3} md={3} className="x-input x-right">
        <div className="final-x-axis">{data.right}</div>
      </Grid>
    </Grid>
  );
}
