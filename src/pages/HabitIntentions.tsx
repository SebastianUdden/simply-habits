import styled from "styled-components";
import DraggableList from "../components/draggable/DraggableList";
import Habit, { HabitProps } from "../components/Habit";
import NewHabitIntention from "../components/NewHabitIntention";

type typeProp = "desired" | "undesired" | "achieved";
const DESIRED = "desired";
const UNDESIRED = "undesired";
const ACHIEVED = "achieved";

interface HabitIntentionProps {
  desired: HabitProps[];
  undesired: HabitProps[];
  achieved: HabitProps[];
}

interface Props {
  habitIntentions: HabitIntentionProps;
  onSave: Function;
}

const HabitIntentions = ({ habitIntentions, onSave }: Props) => {
  const { desired, undesired, achieved } = habitIntentions;

  const handleDelete = (type: typeProp, id: string) =>
    onSave({
      ...habitIntentions,
      [type]: habitIntentions[type].filter((h) => h.id !== id),
    });

  const handleEdit = (type: typeProp, habit: HabitProps) =>
    onSave({
      ...habitIntentions,
      [type]: habitIntentions[type].map((h: HabitProps) =>
        h.id === habit.id ? habit : h
      ),
    });

  return (
    <Wrapper>
      <h1>Habit Intentions</h1>
      <NewHabitIntention
        onAddHabitIntention={(habit: any) =>
          onSave({
            ...habitIntentions,
            desired: [...habitIntentions.desired, habit],
          })
        }
      />
      {desired.length !== 0 && (
        <>
          <h2>Desired</h2>
          <ul>
            {desired.length > 1 && (
              <Ingress>
                Creating new habits is a long term game, remember to only work
                on ONE new habit at a time and make sure it sticks. Work on the
                first habit until it's been achieved (roughly 50 repetitions or
                4 weeks) before moving it to the achieved list and continuing
                with the next habit.
              </Ingress>
            )}

            <DraggableList
              onListUpdate={(list: any) =>
                onSave({ ...habitIntentions, desired: list })
              }
              list={desired}
              listView={desired.map((habit: HabitProps, i: number) => (
                <HabitWrapper>
                  {i === 0 ? (
                    <Habit
                      {...habit}
                      onEdit={(h: HabitProps) => handleEdit(DESIRED, h)}
                      onDelete={(id: string) => handleDelete(DESIRED, id)}
                      onAchieved={(id: string) => {
                        const newHabit = desired.find((h) => h.id === id);
                        const filteredList = desired.filter((h) => h.id !== id);
                        onSave({
                          desired: filteredList,
                          undesired,
                          achieved: [newHabit, ...achieved],
                        });
                      }}
                    />
                  ) : (
                    <Habit
                      {...habit}
                      onEdit={(h: HabitProps) => handleEdit(DESIRED, h)}
                      onDelete={(id: string) => handleDelete(DESIRED, id)}
                    />
                  )}
                </HabitWrapper>
              ))}
            />
          </ul>
        </>
      )}
      <hr />
      {undesired.length !== 0 && (
        <>
          <h2>Undesired</h2>
          <ul>
            <DraggableList
              onListUpdate={(list: any) =>
                onSave({ ...habitIntentions, undesired: list })
              }
              list={undesired}
              listView={undesired.map((habit: HabitProps) => (
                <HabitWrapper>
                  <Habit
                    {...habit}
                    onEdit={(h: HabitProps) => handleEdit(UNDESIRED, h)}
                    onDelete={(id: string) => handleDelete(UNDESIRED, id)}
                  />
                </HabitWrapper>
              ))}
            />
          </ul>
        </>
      )}
      {achieved.length !== 0 && (
        <>
          <h2>Achieved</h2>
          <ul>
            <DraggableList
              onListUpdate={(list: any) =>
                onSave({ ...habitIntentions, achieved: list })
              }
              list={achieved}
              listView={achieved.map((habit: HabitProps) => (
                <HabitWrapper>
                  <Habit
                    {...habit}
                    onEdit={(h: HabitProps) => handleEdit(ACHIEVED, h)}
                    onDelete={(id: string) => handleDelete(ACHIEVED, id)}
                  />
                </HabitWrapper>
              ))}
            />
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
const HabitWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Ingress = styled.p`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default HabitIntentions;
