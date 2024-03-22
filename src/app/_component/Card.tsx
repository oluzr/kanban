"use client";
import { TodoItem } from "@/types/types";
import React from "react";
import clsx from "clsx";
import { statusColor } from "@/lib/lib";
import styled from "styled-components";
const Card = ({ item }: { item: TodoItem }) => {
  return (
    <CardItem>
      <h3 className="text-sm mb-3 text-gray-700">{item.title}</h3>
      <p
        className={clsx(
          "text-xs w-max p-1 rounded mr-2 text-gray-700",
          statusColor(item.status)
        )}
      >
        {item.status}
      </p>
    </CardItem>
  );
};

export default Card;

const CardItem = styled.div`
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  h3 {
    width: calc(100% - 20px);
  }
`;
