"use client";
import { TodoItem } from "@/types/types";
import React from "react";
import clsx from "clsx";
import { statusColor } from "@/lib/lib";
const Card = ({ item }: { item: TodoItem }) => {
  return (
    <div className="p-2 rounded shadow-sm border-gray-100 border-2">
      <h3 className="text-sm mb-3 text-gray-700">{item.title}</h3>
      <p
        className={clsx(
          "text-xs w-max p-1 rounded mr-2 text-gray-700",
          statusColor(item.status)
        )}
      >
        {item.status}
      </p>

    </div>
  );
};

export default Card;
