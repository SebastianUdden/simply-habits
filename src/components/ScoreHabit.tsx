import { useState } from "react";
import styled from "styled-components";
import { Input } from "../pages/Scorecard";
import SelectButtons, { SelectButton } from "./SelectButtons";

export interface ScoreHabitProps {
  id: string;
  type: string;
  description: string;
}

interface Props extends ScoreHabitProps {
  index: number;
  habits: ScoreHabitProps[];
  onChangeHabits: Function;
  handleShowEdit: Function;
  showEdit: boolean;
  onDragOver: Function;
  onDrop: Function;
}

const ScoreHabit = ({
  index,
  id,
  type,
  description,
  habits,
  handleShowEdit,
  showEdit,
  onChangeHabits,
  onDragOver,
  onDrop,
}: Props) => {
  const [text, setText] = useState(description);

  const [isDragged, setIsDragged] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(true);
    onDragOver && onDragOver(index);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const handleDrop = (e: any) => {
    e.stopPropagation();
    setIsDragged(false);
    onDrop && onDrop(index);
  };

  const handleSubmit = (t: string) => {
    if (description && t) {
      handleShowEdit();
      const newHabits = habits.map((h) =>
        h.description === description ? { description: text, type: t } : h
      );
      onChangeHabits(newHabits);
      setText(description);
    }
  };

  // const handleChangePosition = (change: number) => {
  //   const oldIndex = habits.findIndex(
  //     (h: ScoreHabitProps) => h.description === description
  //   );
  //   const newIndex = oldIndex + change;
  //   if (newIndex < 0 || newIndex > habits.length - 1) return;
  //   const tempHabits = [...habits];
  //   const oldObj = habits[oldIndex];
  //   const newObj = habits[newIndex];

  //   tempHabits[oldIndex] = newObj;
  //   tempHabits[newIndex] = oldObj;
  //   onChangeHabits(tempHabits);
  // };

  return (
    <Row
      draggable="true"
      onDragStart={() => setIsDragged(true)}
      onDragEnd={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      isDragged={isDragged}
      isDraggedOver={isDraggedOver}
    >
      <Description onClick={() => handleShowEdit(description)}>
        {showEdit ? (
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <Text>{description}</Text>
        )}
      </Description>
      <Name>
        {showEdit ? (
          <Flex>
            <SelectButtons onClick={(t: any) => handleSubmit(t)} />
            <SelectButton
              bType="-"
              onClick={() => onChangeHabits(habits.filter((h) => h.id !== id))}
            >
              &times;
            </SelectButton>
          </Flex>
        ) : (
          <Flex>
            <SelectButton
              bType={type}
              onClick={() => handleShowEdit(description)}
            >
              {type}
            </SelectButton>
          </Flex>
        )}
      </Name>
    </Row>
  );
};

const Row = styled.tr<{ isDragged: boolean; isDraggedOver: boolean }>`
  background-color: #fff;
  ${(p) =>
    p.isDragged &&
    `
    opacity: 0.01;
  `}
  ${(p) =>
    p.isDraggedOver &&
    `
    opacity: 0.01;
  `}
`;
const Name = styled.td``;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Description = styled.td`
  cursor: pointer;
`;
const Text = styled.span`
  padding: 0 20px;
`;
// const Arrows = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
// const Arrow = styled.button`
//   margin: 2px 2px 0 10px;
//   padding: 4px 12px;
//   border-radius: 3px;
//   border: none;
//   font-size: 14px;
//   cursor: pointer;
//   background-color: ${(p) => p.theme.background.bgColor};
//   color: ${(p) => p.theme.background.color};
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   :hover {
//     opacity: 0.8;
//   }
//   :active {
//     opacity: 0.5;
//   }
// `;

export default ScoreHabit;
