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
import { TodoItem, TodoList, TodoStatus } from "@/types/types";
import AddCard from "./AddCard";
import { IoMdClose } from "react-icons/io";
interface Prop {
  item: TodoList;
  setKanban: React.Dispatch<React.SetStateAction<TodoList>>;
}
export const KanbanList = ({ item, setKanban }: Prop) => {
  const [enabled, setEnabled] = useState(false);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const scourceKey = source.droppableId as TodoStatus;
    const destinationKey = destination.droppableId as TodoStatus;
    const _items = JSON.parse(JSON.stringify(item)) as typeof item;
    const [targetItem] = _items[scourceKey].splice(source.index, 1); // splice 메서드는 원본배열 직접 변경
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setKanban(_items);
  };
  const deleteTodo = (item: TodoItem) => {
    setKanban((prev) => {
      return {
        ...prev,
        [item.status as TodoStatus]: prev[item.status].filter(
          (i) => item.id !== i.id
        ),
      };
    });
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
                <h3 className="text-xl">{todoStatus.toUpperCase()}</h3>
                <ul>
                  {item[todoStatus as TodoStatus].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <CardItem
                          className="text-center shadow-md w-36 card bg-base-200"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).nodeName === "BUTTON")
                              deleteTodo(item);
                          }}
                        >
                          <Card item={item} />
                          <button>x</button>
                        </CardItem>
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
  background: oklch(var(--b2));
  align-items: baseline;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  ul {
    min-width: 200px;
    min-height: 200px;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
  }
`;
const CardItem = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
