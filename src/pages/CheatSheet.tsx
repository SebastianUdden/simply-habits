import styled from "styled-components";
import Law from "../components/cheatsheet/Law";
import { CHEAT_SHEET } from "../constants/cheat-sheet";

const CheatSheet = () => {
  return (
    <Wrapper>
      <h1>Habits Cheat Sheet</h1>
      <h2>The 4 laws</h2>
      {CHEAT_SHEET.laws.map((law) => (
        <Law {...law} />
      ))}
      <hr />
      <h2>The 4 law inversions</h2>
      {CHEAT_SHEET.inversions.map((law) => (
        <Law {...law} />
      ))}
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CheatSheet;
