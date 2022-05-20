import styled from "styled-components";

interface Props {
  onClick: Function;
}

const SelectButtons = ({ onClick }: Props) => {
  return (
    <Buttons>
      <SelectButton onClick={() => onClick("+")} bType="+">
        +
      </SelectButton>
      <SelectButton onClick={() => onClick("-")} bType="-">
        -
      </SelectButton>
      <SelectButton onClick={() => onClick("=")}>=</SelectButton>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
export const SelectButton = styled.button<{ bType?: string }>`
  width: 40px;
  height: 50px;
  margin: 5px;
  border-radius: 6px;
  border: none;
  font-size: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: all 200ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  :active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
  ${(p) =>
    p.bType &&
    p.bType === "+" &&
    `
      background-color: ${p.theme.primary.bgColor};
      color: ${p.theme.primary.color};
  `}
  ${(p) =>
    p.bType &&
    p.bType === "-" &&
    `
      background-color: ${p.theme.error.bgColor};
      color: ${p.theme.error.color};
    `}
`;

export default SelectButtons;
