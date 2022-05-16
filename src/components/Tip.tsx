import styled from "styled-components";

export interface TipProps {
  name: string;
  description: string;
}

const Tip = ({ name, description }: TipProps) => {
  return (
    <Row>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Row>
  );
};

const Row = styled.tr``;
const Name = styled.td`
  text-align: center;
`;
const Description = styled.td`
  padding: 15px 20px;
`;

export default Tip;
