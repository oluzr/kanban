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
import { IoCloseOutline } from "react-icons/io5";
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
            <div className="flex items-center mb-5">
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
                            console.dir((e.target as HTMLElement).nodeName);
                            if (
                              (e.target as HTMLElement).nodeName === "BUTTON" ||
                              (e.target as HTMLElement).nodeName === "svg"
                            )
                              deleteTodo(carditem);
                          }}
                        >
                          <Card item={carditem} />
                          <button onClick={(e) => e.preventDefault()}>
                            <IoCloseOutline />
                          </button>
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
  align-items: baseline;
  height: 80dvh;
  overflow-y: auto;
`;
const Section = styled.section`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s;
`;
const List = styled.ul`
  min-height: 50dvh;
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
  margin-bottom: 20px;
  button {
    z-index: 10;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px;
    svg{
      color: #000;
    }
  }
`;
