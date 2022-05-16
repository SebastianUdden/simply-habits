import { useRef, useState } from "react";
import styled from "styled-components";
import { uuidv4 } from "../utils";
import Habit from "./Habit";

interface Props {
  onAddHabitIntention: Function;
}

const NewHabitIntention = ({ onAddHabitIntention }: Props) => {
  const behaviorRef = useRef<any>(null);
  const timeRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  const [behavior, setBehavior] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const handleSubmit = () => {
    if (behavior && time && location) {
      onAddHabitIntention({
        id: uuidv4(),
        name: behavior,
        isDesired: true,
        isAchieved: false,
        cue: { time, location },
      });
      setBehavior("");
      setTime("");
      setLocation("");
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

  return (
    <Wrapper>
      <Flex>
        <Input
          ref={behaviorRef}
          placeholder="Behavior"
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
        />
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
        <Button onClick={handleSubmit}>Create</Button>
      </Flex>
      <Habit
        index={0}
        id="0"
        isDesired
        name={behavior || "BEHAVIOR"}
        cue={{ time: time || "TIME", location: location || "LOCATION" }}
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
const Input = styled.input`
  padding: 20px;
  font-size: 16px;
  margin-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: none;
  @media (min-width: 600px) {
    width: 100%;
    margin-right: 5px;
    margin-bottom: 0;
  }
`;
const Button = styled.button`
  border: none;
  padding: 20px;
  font-size: 16px;
  background-color: ${(p) => p.theme.primary.bgColor};
  color: ${(p) => p.theme.primary.color};
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
`;

export default NewHabitIntention;
