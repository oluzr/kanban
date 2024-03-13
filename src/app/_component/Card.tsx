"use client";
import { TodoItem } from "@/types/types";
import React from "react";

const Card = ({ item }: { item: TodoItem }) => {
  return (
    <div className="text-center shadow-md w-36 card bg-base-200">
      <div className="card-body">{item.title}</div>
    </div>
  );
};

export default Card;
