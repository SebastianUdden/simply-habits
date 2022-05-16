import styled from "styled-components";

const Todos = () => {
  return (
    <Wrapper>
      <h1>Todos</h1>
      <ul>
        <li>Link to habits scorecard</li>
        <li>Create implementation intentions tab</li>
        <li>Create habit stacking tab</li>
        <li>Create design your environment tab</li>
        <li>Create a calendar to track habits</li>
      </ul>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    padding: 2px 20px;
    li {
      padding: 5px;
    }
  }
`;

export default Todos;
