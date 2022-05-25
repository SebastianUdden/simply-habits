import styled from "styled-components";

interface Props {
  index: number;
  list: any[];
  onListUpdate: Function;
  rounded?: boolean;
}

const Arrows = ({ index, list, onListUpdate, rounded = false }: Props) => {
  const isFirst = index === 0;
  const isLast = index === list.length - 1;
  const handleUpdateList = (change: number) => {
    if (isFirst && change === -1) return;
    if (isLast && change === 1) return;
    const tempArray = list.slice();
    const moveObj = tempArray.splice(index, 1);
    tempArray.splice(index + change, 0, moveObj[0]);
    onListUpdate(tempArray);
  };
  return (
    <Wrapper rounded={rounded}>
      <Arrow
        onClick={() => handleUpdateList(-1)}
        rounded={rounded}
        top
        disabled={isFirst}
      >
        <Up>&lsaquo;</Up>
      </Arrow>
      <Arrow
        onClick={() => handleUpdateList(1)}
        rounded={rounded}
        disabled={isLast}
      >
        <Down>&rsaquo;</Down>
      </Arrow>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ rounded?: boolean }>`
  display: none;
  @media (min-width: 400px) {
    display: flex;
  }
  flex-direction: column;
  justify-content: center;
  ${(p) =>
    p.rounded &&
    `
        height: 20px;
    `};
`;
const Arrow = styled.button<{ rounded?: boolean; top?: boolean }>`
  border: none;
  background-color: black;
  color: white;
  height: 100%;
  font-size: 22px;
  padding: 0 20px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
  ${(p) =>
    p.rounded &&
    `
    border-radius: ${p.top ? "6px 6px 0 0" : "0 0 6px 6px"};
  `}
  ${(p) =>
    p.disabled &&
    `
    opacity: 0.1;
     :hover {
        opacity: 0.1;
    }
  `}
`;
const Up = styled.div`
  transform: rotate(90deg) translateY(-2px) translateX(-2px);
`;
const Down = styled.div`
  transform: rotate(90deg) translateY(-2px) translateX(-2px);
`;

export default Arrows;
