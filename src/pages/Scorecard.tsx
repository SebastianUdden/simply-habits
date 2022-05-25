import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Heading from "../components/Heading";
import ScoreHabit, { ScoreHabitProps } from "../components/ScoreHabit";
import SelectButtons from "../components/SelectButtons";
import { uuidv4 } from "../utils";

interface Props {
  scoreHabits: ScoreHabitProps[];
  onSave: Function;
}

const Scorecard = ({ scoreHabits, onSave }: Props) => {
  const inputRef = useRef<any>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number>(0);
  const [loading, setLoading] = useState<any>(false);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState<any>("");
  const [showEditFor, setShowEditFor] = useState("");

  const handleDrop = (index: number) => {
    if (index === dragOverIndex) return;
    const tempArray = scoreHabits.slice();
    const moveObj = tempArray.splice(index, 1);
    tempArray.splice(dragOverIndex, 0, moveObj[0]);
    onSave(tempArray);
  };

  const handleSubmit = (type: string) => {
    if (
      description &&
      !scoreHabits.some(
        (h: ScoreHabitProps) => h.description === description
      ) &&
      type
    ) {
      setDescription("");
      inputRef?.current?.focus();
      onSave([...scoreHabits, { id: uuidv4(), description, type }]);
    }
  };

  const handleUpdateHabits = (hbts: ScoreHabitProps[]) => onSave(hbts);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 10);
    // eslint-disable-next-line
  }, [scoreHabits]);

  return (
    <Wrapper>
      <Heading>Habits Scorecard</Heading>
      <Table>
        <THead>
          <tr onClick={() => setShowDescription(!showDescription)}>
            <th>
              Daily Habits{" "}
              {showDescription && (
                <Tooltip>
                  Does this behavior help me become the type of person I wish to
                  be? <br />
                  Does this habit cast a vote for or against my desired
                  identity?
                </Tooltip>
              )}
            </th>
            <TH>
              <>
                Positive (+)
                <br />
                Negative (-)
                <br />
                Neutral (=)
              </>
            </TH>
          </tr>
        </THead>
        <TBody>
          <tr>
            <InputCell>
              <Input
                ref={inputRef}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Enter new habit"
              />
            </InputCell>
            <td>
              <SelectButtons onClick={handleSubmit} />
            </td>
          </tr>
          {!loading
            ? scoreHabits.map((habit: ScoreHabitProps, index: number) => (
                <ScoreHabit
                  {...habit}
                  index={index}
                  onDragOver={(index: number) => setDragOverIndex(index)}
                  onDrop={handleDrop}
                  handleShowEdit={(description: string) =>
                    setShowEditFor(description)
                  }
                  showEdit={showEditFor === habit.description}
                  habits={scoreHabits}
                  onChangeHabits={handleUpdateHabits}
                />
              ))
            : scoreHabits.map(() => (
                <tr>
                  <td>
                    <Empty />
                  </td>
                  <td>
                    <Empty />
                  </td>
                </tr>
              ))}
        </TBody>
      </Table>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: left;
`;
const Table = styled.table`
  background-color: ${(p) => p.theme.secondary.bgColor};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 15px;
  border-radius: 6px;
  width: 100%;
`;
const THead = styled.thead`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  cursor: pointer;
  th {
    padding: 20px;
  }
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 0.2;
  }
`;
const TH = styled.th`
  width: 30% !important;
`;
const TBody = styled.tbody`
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
  padding: 20px;
  font-size: 16px;
`;
const InputCell = styled.td``;
const Empty = styled.div`
  height: 60px;
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
`;
const Tooltip = styled.p`
  opacity: 0.8;
  font-weight: 400;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border: none;
  margin: 0;
  width: 100%;
  min-width: 40vw;
  height: 100%;
  padding: 20px 20px;
  font-size: 16px;
`;

export default Scorecard;
