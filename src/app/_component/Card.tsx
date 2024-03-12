"use client";
import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
const Card = () => {

  return (
    <div  className="text-center shadow-md w-36 card bg-base-200">
      <div className="card-body">아이템</div>
    </div>
  );
};

export default Card;
