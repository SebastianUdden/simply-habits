import styled from "styled-components";
import Law from "../components/Law";
import { CHEAT_SHEET } from "../constants/cheat-sheet";

const CheatSheet = () => {
  return (
    <Wrapper>
      <h1>Habits Cheat Sheet</h1>
      {CHEAT_SHEET.laws.map((law) => (
        <Law {...law} />
      ))}
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CheatSheet;
