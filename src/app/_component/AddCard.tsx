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
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
        value={content}
      />
      <Button type="submit" btnClass="secondary">
        Add
      </Button>
    </FormWrap>
  );
};
export default AddCard;

const FormWrap = styled.form`
  padding: 3% 5%;
  background: oklch(var(--b2));
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ShowBtn = styled.div`
  border: 1px dashed;
  padding: 20px;
  text-align: center;
`;
