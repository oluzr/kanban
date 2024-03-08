"use client";
import React from "react";
import { useDrag } from "react-dnd";
const Card = () => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      // item: ,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return <div ref={dragRef}>아이템</div>;
};

export default Card;
