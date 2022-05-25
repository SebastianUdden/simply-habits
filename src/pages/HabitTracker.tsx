import { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import Arrows from "../components/draggable/Arrows";
import Habit, { Completion, HabitProps } from "../components/Habit";
import Heading from "../components/Heading";
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
      <Heading>Habit Tracker</Heading>
      {habitIntentions.desired.map((h: HabitProps, i: number) => (
        <>
          <HabitWrapper
            onClick={() =>
              setSelectedHabit(selectedHabit === h ? undefined : h)
            }
          >
            <Habit
              {...h}
              onAddCompletion={handleAddCompletion}
              isSelected={selectedHabit === h}
            />
            <Arrows
              index={i}
              list={habitIntentions.desired}
              onListUpdate={(list: any) =>
                onSave({ ...habitIntentions, desired: list })
              }
            />
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
  display: flex;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  :active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;
export default HabitTracker;
