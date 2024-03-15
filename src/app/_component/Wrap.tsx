"use client";
import { TodoList } from "@/types/types";
import React, { useState } from "react";
import { KanbanList } from "./KanbanList";
import AddCard from "./AddCard";
import styled from "styled-components";
import Button from "./Button";

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
  return (
    <Wrapper>
      <KanbanList item={kanban} setKanban={setKanban}></KanbanList>
      <FormWrap>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
        />
        <Button type="submit" btnClass="secondary">
          Add
        </Button>
      </FormWrap>
    </Wrapper>
  );
};

export default Wrap;

const Wrapper = styled.div`
  height: 100%;
`;
const FormWrap = styled.form`
  padding: 3% 5%;
  background: oklch(var(--b2));
  display: flex;
  align-items: center;
  gap: 10px;
`;
