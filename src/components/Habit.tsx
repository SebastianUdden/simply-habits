import { useState } from "react";
import styled from "styled-components";
import Cue, { CueProps } from "./Cue";
import EditHabitIntention from "./EditHabitIntention";

export interface Completion {
  datetime: Date;
}
export interface HabitProps {
  id: string;
  name: string;
  cue: CueProps;
  completions?: Completion[];
  onAddCompletion?: Function;
  onEdit?: Function;
  onAchieved?: Function;
  onDelete?: Function;
}

const Habit = ({
  id,
  name,
  cue,
  completions,
  onAddCompletion,
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
          onEdit={handleEditHabitIntention}
        />
      ) : (
        <Wrapper>
          <Row>
            <Column>
              <Row>
                <P>
                  I will <Name>{name}</Name> {cue && <Cue {...cue} />}
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
              </Row>
              {onAddCompletion && completions && (
                <Row>
                  <Count pass50={completions?.length > 49}>
                    <span>{completions.length}</span>
                    {completions.map((c) => (
                      <Dot />
                    ))}
                  </Count>
                </Row>
              )}
            </Column>
            {onAddCompletion && (
              <Button onClick={() => onAddCompletion(id)}>+</Button>
            )}
          </Row>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${(p) => p.theme.background.bgColor};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  opacity: 1;
`;
const Row = styled.div`
  display: flex;
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const P = styled.p`
  margin: 0;
  padding: 25px 30px;
  user-select: none;
`;
const Name = styled.label`
  color: ${(p) => p.theme.secondary.bgColor};
  font-weight: 700;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: 600px) {
  }
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
const Count = styled(P)<{ pass50: boolean }>`
  background-color: ${(p) =>
    p.theme[p.pass50 ? "primary" : "secondary"].bgColor};
  color: ${(p) => p.theme.primary.color};
  padding: 10px 30px 7px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  span {
    width: 17px;
  }
`;
const Dot = styled.div`
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 4px 0 3px 7px;
`;

export default Habit;
