import styled from "styled-components";

export interface CueProps {
  time: string | undefined;
  location?: string | undefined;
  habit?: string | undefined;
}

const Cue = ({ time, location, habit }: CueProps) => {
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
      {habit && (
        <>
          after I <Name>{habit}</Name>
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
