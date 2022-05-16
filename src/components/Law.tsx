import styled from "styled-components";
import Tip, { TipProps } from "./Tip";

interface Props {
  name: string;
  description: string;
  tips: TipProps[];
}

const Law = ({ name, description, tips }: Props) => {
  return (
    <Table>
      <THead>
        <th>{name}</th>
        <th>{description}</th>
      </THead>
      <TBody>
        {tips.map((tip) => (
          <Tip {...tip} />
        ))}
      </TBody>
    </Table>
  );
};

export const Table = styled.table`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 25px;
  border-radius: 6px;
  width: 100%;
`;
export const THead = styled.thead`
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
  th {
    padding: 20px;
    text-align: center;
    white-space: nowrap;
  }
`;
export const TBody = styled.tbody`
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
  padding: 20px;
`;

export default Law;
