import styled from "styled-components";
import Habit, { HabitProps } from "../components/Habit";
import { HabitIntentionProps } from "./HabitIntentions";

interface Props {
  habitIntentions: HabitIntentionProps;
  onSave: Function;
}

const HabitTracker = ({ habitIntentions, onSave }: Props) => {
  const handleAddCompletion = (id: string) => {
    onSave({
      ...habitIntentions,
      desired: habitIntentions.desired.map((h: HabitProps) =>
        h.id === id
          ? {
              ...h,
              completions: [...(h.completions || []), { time: new Date() }],
            }
          : h
      ),
    });
  };

  return (
    <Wrapper>
      <h1>Habit Tracker</h1>
      {habitIntentions.desired.map((h: HabitProps) => (
        <HabitWrapper>
          <Habit {...h} onAddCompletion={handleAddCompletion} />
        </HabitWrapper>
      ))}
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const HabitWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export default HabitTracker;
