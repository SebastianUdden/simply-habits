import styled from "styled-components";
import Icon from "../icons/Icon";

interface IconProps {
  viewBox?: string;
  path: JSX.Element;
  color?: string;
  size?: number;
  onClick?: Function;
}

interface TabProps {
  icon: IconProps;
  text: string;
}

interface Props {
  tabs: TabProps[];
  tab: string;
  onTabChange: Function;
}

const Navigation = ({ tabs, tab, onTabChange }: Props) => {
  return (
    <Wrapper>
      {tabs.map(({ icon, text }) => (
        <Tab
          key={text}
          onClick={() => onTabChange(text)}
          selected={tab === text}
        >
          <Icon {...icon} onClick={() => null} />
          {text}
        </Tab>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(p) => p.theme.background.color};
`;
const Tab = styled.button<{ selected?: boolean }>`
  text-transform: capitalize;
  font-size: 11px;
  font-family: sans-serif;
  padding: 20px 0;
  border: none;
  width: 100%;
  background-color: ${(p) => p.theme.primary.bgColor};
  color: ${(p) => p.theme.primary.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  ${(p) =>
    p.selected &&
    `
    background-color: ${p.theme.primaryVariant.bgColor};
    color: ${p.theme.primaryVariant.color};
  `}
`;

export default Navigation;
