import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { TodoList } from "@/types/types";
interface Prop {
  setKanban: React.Dispatch<React.SetStateAction<TodoList>>;
}
const AddCard = ({ setKanban }: Prop) => {
  const [content, setContent] = useState("");
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setKanban((prev) => {
      return {
        ...prev,
        todo: [
          ...prev.todo,
          {
            id: Date.now() + "",
            title: content,
            status: "todo",
          },
        ],
      };
    });
    setContent("");
  };
  return (
    <FormWrap onSubmit={handleSubmit}>
      <input
        onChange={(e) => setContent(e.target.value)}
        className="input w-full"
        placeholder="Add Todo"
        value={content}
      />
      <Button type="submit" btnClass="primary">
        add
      </Button>
    </FormWrap>
  );
};
export default AddCard;

const FormWrap = styled.form`
  padding: 3% 5%;
  height: 20dvh;
  background: oklch(var(--b2));
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  
`;
const ShowBtn = styled.div`
  border: 1px dashed;
  padding: 20px;
  text-align: center;
`;
