import { useState } from "react";
import styled from "styled-components";
import Cue, { CueProps } from "./Cue";
import EditHabitIntention from "./EditHabitIntention";

export interface HabitProps {
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
  id,
  name,
  cue,
  isDesired,
  isAchieved,
  onEdit,
  onAchieved,
  onDelete,
}: HabitProps) => {
  const [showEdit, setShowEdit] = useState(false);

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
        <Wrapper>
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

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(p) => p.theme.background.bgColor};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-between;
  opacity: 1;
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
