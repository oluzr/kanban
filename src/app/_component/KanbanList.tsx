"use client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
const titleList = ["진행전", "진행중", "완료"];
export const KanbanListWrap = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      {titleList.map((item, idx) => (
        <KanbanList key={idx} title={item} />
      ))}
    </DndProvider>
  );
};

const KanbanList = ({ title }: { title: string }) => {
  return (
    <ul>
      {title}
      <Card />
    </ul>
  );
};
