import styled from "styled-components";
import logo from "../icons/logo.png";

const Logo = () => {
  const handleClick = () => {
    localStorage.setItem("tab", "home");
    window.location.reload();
  };
  return <LogoImg src={logo} onClick={handleClick} />;
};

const LogoImg = styled.img`
  width: 30px;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
`;

export default Logo;
