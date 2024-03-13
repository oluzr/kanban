"use client";
import { TodoList } from "@/types/types";
import React, { useState } from "react";
import { KanbanList } from "./KanbanList";

const Wrap = () => {
  const [kanban, setKanban] = useState<TodoList>({
    todo: [...Array(5)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "todo",
    })),
    doing: [],
  });
  return <KanbanList item={kanban} setKanban={setKanban}></KanbanList>;
};

export default Wrap;
