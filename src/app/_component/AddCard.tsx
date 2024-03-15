import React, { useState } from "react";
import styled from "styled-components";

const AddCard = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return <ShowBtn>add card</ShowBtn>;
};

export default AddCard;

const ShowBtn = styled.div`
  border: 1px dashed;

  padding: 20px;
  text-align: center;
`;
