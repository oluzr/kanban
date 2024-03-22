"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import clsx from "clsx";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TodoItem, TodoList, TodoStatus } from "@/types/types";
import { statusColor } from "@/lib/lib";
interface Prop {
  item: TodoList;
  setKanban: React.Dispatch<React.SetStateAction<TodoList>>;
}
export const KanbanList = ({ item, setKanban }: Prop) => {
  const [enabled, setEnabled] = useState(false);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    console.dir(destination);
    const scourceKey = source.droppableId as TodoStatus;
    const destinationKey = destination.droppableId as TodoStatus;
    const _items = JSON.parse(JSON.stringify(item)) as typeof item;
    const [targetItem] = _items[scourceKey].splice(source.index, 1); // splice 메서드는 원본배열 직접 변경
    if (scourceKey !== destinationKey) targetItem.status = destinationKey;
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setKanban(_items);
  };
  const deleteTodo = (item: TodoItem) => {
    console.log(item);
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
          <Section key={todoStatus}>
            <div className="flex flex-row justify-between items-center mb-2 mx-1">
              <div className="flex items-center">
                <h2
                  className={clsx(
                    `text-sm w-max px-1 rounded mr-2 text-gray-700 ${statusColor(
                      todoStatus
                    )}`
                  )}
                >
                  {todoStatus}
                </h2>
                <p className="text-gray-400 text-sm">{item[todoStatus].length}</p>
              </div>
            </div>
            <Droppable key={todoStatus} droppableId={todoStatus}>
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  {item[todoStatus as TodoStatus].map((carditem, index) => (
                    <Draggable
                      key={carditem.id}
                      draggableId={carditem.id}
                      index={index}
                    >
                      {(provided) => (
                        <CardItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).nodeName === "BUTTON")
                              deleteTodo(carditem);
                          }}
                        >
                          <Card item={carditem} />
                          <button>x</button>
                        </CardItem>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </Section>
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
const Section = styled.section`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s;
`;
const List = styled.ul`
  justify-content: center;
  gap: 20px;
  align-items: center;
  width: 80%;
  transition: all 0.1s;
  display: flex;
  flex-direction: column;
`;
const CardItem = styled.li`
  transition: all 0.1s;
  width: 100%;
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
