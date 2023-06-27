import React, { useState } from "react";
import Quadrant from "./Quadrant";
import { useNavigate, Link } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import { database } from "../firebase.js";
import { ref, set } from "firebase/database";
import "./Main.css";

const LINK_LENGTH = 7;
const SITE_NAME = "alignments.glitch.me";
export default function FormChart() {
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [topError, setTopError] = useState(false);
  const [bottomError, setBottomError] = useState(false);
  const [leftError, setLeftError] = useState(false);
  const [rightError, setRightError] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const valid = validateForm();
    if (valid) {
      const customLink = generateCustomLink();
      const data = {
        link: customLink,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      };

      try {
        set(ref(database, "charts/" + customLink), {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
        });
        navigate(customLink, { state: { data: data } });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    if (top.trim() === "") {
      valid = false;
      setTopError(true);
    } else {
      setTopError(false);
    }

    if (bottom.trim() === "") {
      valid = false;
      setBottomError(true);
    } else {
      setBottomError(false);
    }

    if (left.trim() === "") {
      valid = false;
      setLeftError(true);
    } else {
      setLeftError(false);
    }

    if (right.trim() === "") {
      valid = false;
      setRightError(true);
    } else {
      setRightError(false);
    }

    return valid;
  };

  const generateCustomLink = () => {
    let link = "/";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < LINK_LENGTH; i++) {
      if (i === 4) {
        link += "-";
      }
      let randomCharacter =
        alphabet[Math.floor(Math.random() * alphabet.length)];

      link += randomCharacter;
    }
    return link;
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Box display={{ xs: "block", sm: "none" }}>
            <div className="header title">
              <Link to="/">{SITE_NAME}</Link>
            </div>
          </Box>
        </Grid>
        <Grid item xs={3} md={3}>
          <Box display={{ xs: "none", sm: "block" }}>
            <div className="header title">
              <Link to="/">{SITE_NAME}</Link>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          <div className="header">
            <Button
              color="custom"
              variant="contained"
              size="large"
              onClick={handleSubmit}
            >
              create
            </Button>
          </div>
        </Grid>
        <Grid item xs={3} md={3}></Grid>
        <Grid item xs={12} md={12} className="y-input">
          <TextField
            error={topError}
            helperText={topError && "Please enter a value"}
            size="small"
            inputProps={{
              style: { textAlign: "center" },
            }}
            label="y-top"
            variant="outlined"
            value={top}
            onChange={(e) => {
              setTop(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3} md={3} className="x-input x-left">
          <TextField
            error={leftError}
            helperText={leftError && "Please enter a value"}
            size="small"
            inputProps={{ style: { textAlign: "center" } }}
            label="x-left"
            variant="outlined"
            value={left}
            onChange={(e) => {
              setLeft(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} md={6} className="chart">
          <div className="axes">
            <div className="upper">
              <Quadrant position={1} />
              <Quadrant position={2} />
            </div>
            <div className="lower">
              <Quadrant position={3} />
              <Quadrant position={4} />
            </div>
          </div>
        </Grid>
        <Grid item xs={3} md={3} className="x-input x-right">
          <TextField
            error={rightError}
            helperText={rightError && "Please enter a value"}
            size="small"
            inputProps={{ style: { textAlign: "center" } }}
            label="x-right"
            variant="outlined"
            className="field"
            value={right}
            onChange={(e) => {
              setRight(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} className="y-input">
          <TextField
            error={bottomError}
            helperText={bottomError && "Please enter a value"}
            size="small"
            inputProps={{ style: { textAlign: "center" } }}
            label="y-bottom"
            variant="outlined"
            value={bottom}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
