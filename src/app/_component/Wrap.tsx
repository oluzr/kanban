"use client";
import { TodoList } from "@/types/types";
import React, { useEffect, useState } from "react";
import { KanbanList } from "./KanbanList";
import AddCard from "./AddCard";
import styled from "styled-components";
import Button from "./Button";
import { setLocalStorage } from "@/lib/lib";

const Wrap = () => {
  const [kanban, setKanban] = useState<TodoList>({
    todo: [...Array(5)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "todo",
    })),
    doing: [],
    done: [],
  });
  useEffect(() => {
    const _kanban = localStorage.getItem("kanban");
    if (!_kanban || _kanban === undefined) return;
    setKanban(JSON.parse(_kanban));
  }, []);
  useEffect(() => {
    setLocalStorage(kanban);
  }, [kanban]);
  return (
    <Wrapper>
      <KanbanList item={kanban} setKanban={setKanban}></KanbanList>
      <AddCard setKanban={setKanban} />
    </Wrapper>
  );
};

export default Wrap;

const Wrapper = styled.div`
  height: 100%;
`;
