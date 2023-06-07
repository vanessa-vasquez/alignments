import React, { useState, useRef } from "react";
import Paint from "../assets/Paint";

export default function Quadrant({ position }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return <div className={`quadrant-${position}`}></div>;
}
