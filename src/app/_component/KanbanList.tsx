"use client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import styled from "styled-components";

const ListWrap = styled.div`
  display: flex;
  gap: 10px;
  padding: 5% 0;
  justify-content: space-around;
  align-items: center;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  h3 {
  }
  ul {
    display: flex;
  }
`;

const titleList = ["진행전", "진행중", "완료"];
export const KanbanListWrap = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListWrap>
        {titleList.map((item, idx) => (
          <KanbanList key={idx} title={item} />
        ))}
      </ListWrap>
    </DndProvider>
  );
};

const KanbanList = ({ title }: { title: string }) => {
  return (
    <List>
      <h3 className="text-2xl">{title}</h3>
      <ul>
        <Card />
      </ul>
    </List>
  );
};
