"use client";
import React, { useEffect, useState } from "react";

import Card from "./Card";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export const KanbanListWrap = () => {
  const [enabled, setEnabled] = useState(false);
  const items = [...Array(4)].map((_, i) => ({
    id: `${i}${i}${i}`,
    content: `item-${i}`,
  }));

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(">>> source", source);
    console.log(">>> destination", destination);
  };
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const KanbanList = ({ title }: { title: string }) => {
  return (
    <List>
      <h3 className="text-2xl">{title}</h3>
      <ul></ul>
    </List>
  );
};
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
