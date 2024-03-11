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
  return (
    <div ref={dragRef} className="text-center shadow-md w-36 card bg-base-200">
      <div className="card-body">아이템</div>
    </div>
  );
};

export default Card;
