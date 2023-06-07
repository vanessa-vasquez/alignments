import React, { useState } from "react";
import "./Chart.css";
import HorizontalLine from "./HorizontalLine";
import VerticalLine from "./VerticalLine";
import Dot from "./Dot";
import Quadrant from "./Quadrant";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormChart() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const customLink = generateCustomLink();
    navigate(customLink, { state: { data: data } });
  };

  const generateCustomLink = () => {
    let link = "/";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 7; i++) {
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
    <div className="body">
      <div className="chart">
        <div className="axes">
          <HorizontalLine />
          <VerticalLine />
          <Quadrant position={1} register={register} />
          <Quadrant position={2} register={register} />
          <Quadrant position={3} register={register} />
          <Quadrant position={4} register={register} />
          <form>
            <input className="y-top" {...register("top")} />
            <input className="y-bottom" {...register("bottom")} />
            <input className="x-left" {...register("left")} />
            <input className="x-right" {...register("right")} />
            <button className="submit-btn" onClick={handleSubmit(onSubmit)}>
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
