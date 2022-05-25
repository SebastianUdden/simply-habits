import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { uuidv4 } from "../utils";
import Habit from "./Habit";
import Heading from "./Heading";

interface Props {
  onAddHabitIntention: Function;
}

const NewHabitIntention = ({ onAddHabitIntention }: Props) => {
  const behaviorRef = useRef<any>(null);
  const timeRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);
  const temptationRef = useRef<any>(null);
  const questionRef = useRef<any>(null);

  const [behavior, setBehavior] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [trigger, setTrigger] = useState("");
  const [temptation, setTemptation] = useState("");
  const [isStacking, setIsStacking] = useState(true);
  const [isTemptation, setIsTemptation] = useState(false);
  const [showSave, setShowSave] = useState(false);

  const reset = () => {
    setBehavior("");
    setTime("");
    setLocation("");
    setTrigger("");
    setTemptation("");
  };

  const stackSubmit = () => {
    if (behavior && trigger) {
      onAddHabitIntention({
        id: uuidv4(),
        name: behavior,
        cue: { trigger, ...(isTemptation && { temptation }) },
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
    if (isTemptation && !temptation && temptationRef.current) {
      temptationRef.current.focus();
      return;
    }
    if (behaviorRef.current) {
      behaviorRef.current.focus();
    }
  };
  const regularSubmit = () => {
    if (behavior && time && location) {
      onAddHabitIntention({
        id: uuidv4(),
        name: behavior,
        cue: { time, location, temptation },
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
    if (isTemptation && !temptation && temptationRef.current) {
      temptationRef.current.focus();
      return;
    }
    if (behaviorRef.current) {
      behaviorRef.current.focus();
    }
  };

  const handleSubmit = () => {
    setShowSave(false);
    isStacking ? stackSubmit() : regularSubmit();
  };

  useEffect(() => {
    if (showSave) {
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else {
      behaviorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [showSave]);

  return (
    <Wrapper>
      <Heading>
        Habit {isStacking ? "stack" : "intention"}{" "}
        {isTemptation && "with temptation"}
      </Heading>
      <Column showSave={showSave}>
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
          {isTemptation && (
            <Input
              ref={temptationRef}
              placeholder="Temptation"
              value={temptation}
              onChange={(e) => setTemptation(e.target.value)}
            />
          )}
          <Toggle onClick={() => setIsStacking(!isStacking)}>
            {isStacking ? "Intention" : "Stack"}
          </Toggle>
          <Toggle onClick={() => setIsTemptation(!isTemptation)}>
            {isTemptation ? "Willpower" : "Temptation"}
          </Toggle>
          <Button onClick={() => setShowSave(true)}>Create</Button>
        </Flex>
        <Habit
          id="0"
          name={behavior || "BEHAVIOR"}
          cue={{
            ...(isStacking && {
              trigger: trigger || "TRIGGER",
            }),
            ...(isTemptation && {
              temptation: temptation || "TEMPTATION",
            }),
            ...(!isStacking && {
              time: time || "TIME",
              location: location || "LOCATION",
            }),
          }}
        />
      </Column>
      {showSave && (
        <Flex>
          <Ingress ref={questionRef}>
            Can the habit/behavior be done in <strong>2 minutes or less</strong>
            ?
          </Ingress>
          <Cancel onClick={() => setShowSave(false)}>No</Cancel>
          <Save onClick={handleSubmit}>Yes</Save>
        </Flex>
      )}
    </Wrapper>
  );
};

const RESPONSIVE_WIDTH = "900px";

const Wrapper = styled.div``;
const Column = styled.div<{ showSave?: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.showSave ? "column" : "column-reverse")};
  @media (min-width: 600px) {
    flex-direction: column;
  }
`;
const Flex = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  max-width: 100%;
  @media (min-width: ${RESPONSIVE_WIDTH}) {
    flex-direction: row;
  }
`;
export const Input = styled.input`
  -webkit-appearance: none;
  padding: 20px;
  font-size: 16px;
  margin-bottom: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: none;
  @media (min-width: ${RESPONSIVE_WIDTH}) {
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
  margin-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
  @media (min-width: ${RESPONSIVE_WIDTH}) {
    margin-bottom: 0;
  }
`;
const Toggle = styled(Button)`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  @media (min-width: ${RESPONSIVE_WIDTH}) {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const Save = styled(Button)`
  @media (min-width: ${RESPONSIVE_WIDTH}) {
    margin: 14px 0;
  }
`;
const Cancel = styled(Button)`
  background-color: ${(p) => p.theme.error.bgColor};
  color: ${(p) => p.theme.error.color};
  @media (min-width: ${RESPONSIVE_WIDTH}) {
    margin: 14px 5px 14px 5px;
  }
`;
const Ingress = styled.p`
  box-sizing: border-box;
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  width: 100%;
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 5px;
`;

export default NewHabitIntention;
