import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import Habit, { Completion, HabitProps } from "../components/Habit";
import { HabitIntentionProps } from "./HabitIntentions";

interface Props {
  habitIntentions: HabitIntentionProps;
  onSave: Function;
}

const HabitTracker = ({ habitIntentions, onSave }: Props) => {
  const [selectedHabit, setSelectedHabit] = useState<any>();

  const handleAddCompletion = (id: string) => {
    onSave({
      ...habitIntentions,
      desired: habitIntentions.desired.map((h: HabitProps) =>
        h.id === id
          ? {
              ...h,
              completions: [...(h.completions || []), { datetime: new Date() }],
            }
          : h
      ),
    });
  };

  useEffect(() => {
    setSelectedHabit(undefined);
  }, [habitIntentions]);

  return (
    <Wrapper>
      <h1>Habit Tracker</h1>
      {habitIntentions.desired.map((h: HabitProps) => (
        <>
          <HabitWrapper
            onClick={() =>
              setSelectedHabit(selectedHabit === h ? undefined : h)
            }
          >
            <Habit {...h} onAddCompletion={handleAddCompletion} />
          </HabitWrapper>
          {selectedHabit === h && (
            <Calendar
              dates={selectedHabit?.completions?.map(
                (c: Completion) => c.datetime
              )}
            />
          )}
          <br />
        </>
      ))}
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const HabitWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  :active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;
export default HabitTracker;
