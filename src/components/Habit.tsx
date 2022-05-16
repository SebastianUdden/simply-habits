import { useState } from "react";
import styled from "styled-components";
import Cue, { CueProps } from "./Cue";
import EditHabitIntention from "./EditHabitIntention";

export interface HabitProps {
  index: number;
  id: string;
  name: string;
  cue: CueProps;
  isDesired: boolean;
  isAchieved?: boolean;
  onEdit?: Function;
  onAchieved?: Function;
  onDelete?: Function;
  onDrop?: Function;
  onDragOver?: Function;
}

const Habit = ({
  index,
  id,
  name,
  cue,
  isDesired,
  isAchieved,
  onDrop,
  onDragOver,
  onEdit,
  onAchieved,
  onDelete,
}: HabitProps) => {
  const [showEdit, setShowEdit] = useState(false);
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
  const handleEditHabitIntention = (h: HabitProps) => {
    setShowEdit(false);
    onEdit && onEdit(h);
  };

  return (
    <>
      {showEdit ? (
        <EditHabitIntention
          id={id}
          name={name}
          cue={cue}
          isDesired={isDesired}
          isAchieved={isAchieved}
          onEdit={handleEditHabitIntention}
        />
      ) : (
        <Wrapper
          draggable="true"
          onDragStart={() => setIsDragged(true)}
          onDragEnd={handleDrop}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          isDragged={isDragged}
          isDraggedOver={isDraggedOver}
        >
          <P>
            I will {isDesired ? "" : "not "}
            <Name>{name}</Name> {cue && <Cue {...cue} />}
          </P>
          <Buttons>
            {onAchieved && (
              <Button onClick={() => onAchieved(id)}>Achieved</Button>
            )}
            {onEdit && (
              <Button onClick={() => setShowEdit(true)} isEdit>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button onClick={() => onDelete(id)} isDelete>
                Delete
              </Button>
            )}
          </Buttons>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div<{ isDragged: boolean; isDraggedOver: boolean }>`
  margin-bottom: 20px;
  background-color: ${(p) => p.theme.background.bgColor};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-between;
  opacity: 1;
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
const P = styled.p`
  margin: 0;
  padding: 25px 30px;
`;
const Name = styled.label`
  color: ${(p) => p.theme.secondary.bgColor};
  font-weight: 700;
`;
const Buttons = styled.div`
  display: flex;
`;
const Button = styled.button<{ isDelete?: boolean; isEdit?: boolean }>`
  font-size: 16px;
  background-color: ${(p) => p.theme.primary.bgColor};
  color: ${(p) => p.theme.primary.color};
  border: none;
  padding: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
  ${(p) =>
    p.isDelete &&
    `
    background-color: ${p.theme.error.bgColor};
    color: ${p.theme.error.color};
  `}
  ${(p) =>
    p.isEdit &&
    `
    background-color: ${p.theme.primaryVariant.bgColor};
    color: ${p.theme.primaryVariant.color};
  `}
`;

export default Habit;
