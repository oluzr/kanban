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
import { TodoList, TodoStatus } from "@/types/types";

interface Prop {
  item: TodoList;
  setKanban: React.Dispatch<React.SetStateAction<TodoList>>;
}
export const KanbanList = ({ item, setKanban }: Prop) => {
  const [enabled, setEnabled] = useState(false);

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
      <ListWrap>
        {Object.keys(item).map((todoStatus) => (
          <Droppable key={todoStatus} droppableId={todoStatus}>
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                <h3>{todoStatus}</h3>
                <ul>
                  {item[todoStatus as TodoStatus].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="text-center shadow-md w-36 card bg-base-200"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="card-body">{item.title}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </ul>
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        ))}
      </ListWrap>
    </DragDropContext>
  );
};
const ListWrap = styled.div`
  display: flex;
  gap: 10px;
  padding: 5% 0;
  justify-content: space-around;
  align-items: baseline;
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
    min-width: 200px;
    background-color: red;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
  }
`;
