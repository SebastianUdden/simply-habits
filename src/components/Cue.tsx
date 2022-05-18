import styled from "styled-components";

export interface CueProps {
  time?: string | undefined;
  location?: string | undefined;
  trigger?: string | undefined;
  temptation?: string | undefined;
}

const Cue = ({ time, location, trigger, temptation }: CueProps) => {
  return (
    <>
      {time && (
        <>
          at <Time>{time}</Time>
        </>
      )}
      {time && location && " "}
      {location && (
        <>
          in <Place>{location}</Place>
        </>
      )}
      {trigger && (
        <>
          after I <Name>{trigger}</Name>
        </>
      )}
      {temptation && (
        <>
          , then I get to <Time>{temptation}</Time>
        </>
      )}
    </>
  );
};

const Time = styled.span`
  font-weight: 700;
  color: ${(p) => p.theme.primary.bgColor};
`;
const Place = styled.span`
  font-weight: 700;
  color: ${(p) => p.theme.primary.bgColor};
`;
const Name = styled.span`
  color: ${(p) => p.theme.primary.bgColor};
  font-weight: 700;
`;

export default Cue;
