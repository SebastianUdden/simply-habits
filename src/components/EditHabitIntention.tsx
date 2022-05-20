import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CueProps } from "./Cue";
import Habit from "./Habit";
import { Input } from "./NewHabitIntention";

interface Props {
  id: string;
  name: string;
  cue: CueProps;
  onEdit?: Function;
}

const EditHabitIntention = ({ onEdit, id, name, cue }: Props) => {
  const behaviorRef = useRef<any>(null);
  const timeRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);

  const [behavior, setBehavior] = useState(name);
  const [time, setTime] = useState(cue.time);
  const [location, setLocation] = useState(cue.location);
  const [trigger, setTrigger] = useState(cue.trigger);
  const [isStacking, setIsStacking] = useState(!!cue.trigger);

  const reset = () => {
    setBehavior("");
    setTime("");
    setLocation("");
    setTrigger("");
  };

  const handleSubmit = () => {
    if (!isStacking && behavior && time && location) {
      onEdit &&
        onEdit({
          id,
          name: behavior,
          cue: { time, location },
        });
      reset();
    }
    if (isStacking && behavior && trigger) {
      onEdit &&
        onEdit({
          id,
          name: behavior,
          cue: { trigger },
        });
      reset();
    }
    if (!behavior && behaviorRef.current) {
      behaviorRef.current.focus();
      return;
    }
    if (!time && timeRef.current) {
      timeRef.current.focus();
      return;
    }
    if (!location && locationRef.current) {
      locationRef.current.focus();
      return;
    }
    if (behaviorRef.current) {
      behaviorRef.current.focus();
    }
  };

  useEffect(() => {
    behaviorRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <Flex>
        <Input
          ref={behaviorRef}
          placeholder="Behavior"
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
        />
        {isStacking ? (
          <Input
            ref={triggerRef}
            placeholder="Trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
          />
        ) : (
          <>
            <Input
              ref={timeRef}
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              ref={locationRef}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </>
        )}
        <Toggle onClick={() => setIsStacking(!isStacking)}>
          {isStacking ? "Stack" : "Intention"}
        </Toggle>
        <Button onClick={handleSubmit}>Save</Button>
      </Flex>
      <Habit
        id="0"
        name={behavior || "BEHAVIOR"}
        cue={
          isStacking
            ? {
                trigger: trigger || "TRIGGER",
              }
            : {
                time: time || "TIME",
                location: location || "LOCATION",
              }
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Flex = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
// const Input = styled.input`
//   padding: 20px;
//   font-size: 16px;
//   margin-bottom: 10px;
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   border: none;
//   @media (min-width: 600px) {
//     width: 100%;
//     margin-right: 5px;
//     margin-bottom: 0;
//   }
// `;
const Button = styled.button`
  border: none;
  padding: 20px;
  font-size: 16px;
  background-color: ${(p) => p.theme.primary.bgColor};
  color: ${(p) => p.theme.primary.color};
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
`;
const Toggle = styled(Button)`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  margin-left: 5px;
  margin-right: 5px;
`;

export default EditHabitIntention;
