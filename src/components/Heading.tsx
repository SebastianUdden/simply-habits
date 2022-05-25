import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

interface Props {
  children: any;
}

const Heading = ({ children }: Props) => (
  <Wrapper>
    <Logo />
    {children}
  </Wrapper>
);

const Wrapper = styled.h1`
  display: flex;
  align-items: center;
`;

export default Heading;
