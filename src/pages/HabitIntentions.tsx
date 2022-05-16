import { useEffect, useState } from "react";
import styled from "styled-components";
import Habit, { HabitProps } from "../components/Habit";
import NewHabitIntention from "../components/NewHabitIntention";

interface Props {
  habitIntentions: HabitProps[];
  onSave: Function;
}

const HabitIntentions = ({ habitIntentions, onSave }: Props) => {
  const [dragOverIndex, setDragOverIndex] = useState<number>(0);
  const [desiredHabits, setDesiredHabits] = useState<HabitProps[]>([]);
  const [undesiredHabits, setUndesiredHabits] = useState<HabitProps[]>([]);
  const [achievedHabits, setAchievedHabits] = useState<HabitProps[]>([]);
  const habits = habitIntentions;

  const handleDelete = (id: string) =>
    onSave(habitIntentions.filter((h) => h.id !== id));

  const handleDrop = (index: number) => {
    if (index === dragOverIndex) return;
    const tempArray = desiredHabits.slice();
    const moveObj = tempArray.splice(index, 1);
    tempArray.splice(dragOverIndex, 0, moveObj[0]);
    setDesiredHabits(tempArray);
  };

  const handleEdit = (habit: HabitProps) =>
    onSave(
      habitIntentions.map((h: HabitProps) => (h.id === habit.id ? habit : h))
    );

  useEffect(() => {
    onSave(habitIntentions);
    setDesiredHabits(habits.filter((h) => h.isDesired && !h.isAchieved));
    setUndesiredHabits(habits.filter((h) => !h.isDesired));
    setAchievedHabits(habits.filter((h) => h.isAchieved));
    // eslint-disable-next-line
  }, [habitIntentions]);

  return (
    <Wrapper>
      <h1>Habit Intentions</h1>
      <NewHabitIntention
        onAddHabitIntention={(habit: any) =>
          onSave([...habitIntentions, habit])
        }
      />
      {desiredHabits.length !== 0 && (
        <>
          <h2>Desired</h2>
          <ul>
            <Habit
              {...desiredHabits[0]}
              index={0}
              onDragOver={(index: number) => setDragOverIndex(index)}
              onDrop={handleDrop}
              onEdit={handleEdit}
              onAchieved={(id: string) => {
                const newHabit = {
                  ...habitIntentions.find((h) => h.id === id),
                  isAchieved: true,
                };
                const theRest = habitIntentions.filter((h) => h.id !== id);
                onSave([newHabit, ...theRest]);
              }}
              onDelete={handleDelete}
            />
            {desiredHabits.length > 1 && (
              <Ingress>
                Creating new habits is a long term game, remember to only work
                on ONE new habit at a time and make sure it sticks. Work on the
                above habit until it's been achieved before moving it to the
                achieved list and continuing with the next habit.
              </Ingress>
            )}
            {desiredHabits.slice(1).map((habit: HabitProps, index: number) => (
              <Habit
                {...habit}
                onDragOver={(index: number) => setDragOverIndex(index)}
                onDrop={handleDrop}
                onDelete={handleDelete}
                index={index + 1}
              />
            ))}
          </ul>
        </>
      )}
      <hr />
      {undesiredHabits.length !== 0 && (
        <>
          <h2>Undesired</h2>
          <ul>
            {undesiredHabits.map((habit: HabitProps, index: number) => (
              <Habit
                {...habit}
                onDragOver={(index: number) => setDragOverIndex(index)}
                onDrop={handleDrop}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </ul>
        </>
      )}
      {achievedHabits.length !== 0 && (
        <>
          <h2>Achieved</h2>
          <ul>
            {achievedHabits.map((habit: HabitProps, index: number) => (
              <Habit
                {...habit}
                onDragOver={(index: number) => setDragOverIndex(index)}
                onDrop={handleDrop}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </ul>
          <hr />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    margin: 0;
    padding: 0;
    margin-bottom: 30px;
  }
`;
const Ingress = styled.p`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default HabitIntentions;
