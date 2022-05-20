import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import { home } from "./icons/home";
import Theme, { themeEnum } from "./Theme";
import HabitIntentions from "./pages/HabitIntentions";
import { dynamicFeed } from "./icons/dynamic-feed";
import { assignmentTurnedIn } from "./icons/assignment-turned-in";
import CheatSheet from "./pages/CheatSheet";
import { assignment } from "./icons/assignment";
import Scorecard from "./pages/Scorecard";
import { insertChart } from "./icons/insert-chart";
import styled from "styled-components";
import { getSaved, save } from "./utils";
import { HabitProps } from "./components/Habit";
import { ScoreHabitProps } from "./components/ScoreHabit";
import HabitTracker from "./pages/HabitTracker";

export const HOME = "home";
export const CHEAT_SHEET = "cheat sheet";
export const SCORECARD = "scorecard";
export const HABIT_INTENTIONS = "habit intentions";
export const HABIT_TRACKER = "habit tracker";

const defaultHabitIntentions = {
  desired: [],
  undesired: [],
  achieved: [],
};

const tabs = [
  { icon: home, text: { desktop: HOME, mobile: HOME } },
  { icon: assignment, text: { desktop: CHEAT_SHEET, mobile: "Help" } },
  { icon: insertChart, text: { desktop: SCORECARD, mobile: "Score" } },
  {
    icon: dynamicFeed,
    text: { desktop: HABIT_INTENTIONS, mobile: "Habits" },
  },
  {
    icon: assignmentTurnedIn,
    text: { desktop: HABIT_TRACKER, mobile: "Tracker" },
  },
];

const App = () => {
  const [habits, setHabits] = useState(getSaved() || {});
  const [tab, setTab] = useState(localStorage.getItem("tab") || HOME);
  const [theme] = useState<themeEnum>(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  useEffect(() => {
    save(habits);
  }, [habits]);

  return (
    <Theme theme={theme}>
      <Container>
        <Wrapper>
          {tab === HOME && <Home />}
          {tab === CHEAT_SHEET && <CheatSheet />}
          {tab === SCORECARD && (
            <Scorecard
              scoreHabits={habits?.scoreHabits || []}
              onSave={(scoreHabits: ScoreHabitProps[]) =>
                setHabits({ ...habits, scoreHabits })
              }
            />
          )}
          {tab === HABIT_INTENTIONS && (
            <HabitIntentions
              habitIntentions={
                habits?.habitIntentions || defaultHabitIntentions
              }
              onSave={(habitIntentions: HabitProps[]) =>
                setHabits({ ...habits, habitIntentions })
              }
            />
          )}
          {tab === HABIT_TRACKER && (
            <HabitTracker
              habitIntentions={
                habits?.habitIntentions || defaultHabitIntentions
              }
              onSave={(habitIntentions: HabitProps[]) =>
                setHabits({ ...habits, habitIntentions })
              }
            />
          )}
          <Navigation
            tab={tab}
            tabs={
              habits?.habitIntentions
                ? tabs
                : tabs.filter((t: any) => t.text.desktop !== HABIT_TRACKER)
            }
            onTabChange={(t: any) => setTab(t)}
          />
        </Wrapper>
      </Container>
    </Theme>
  );
};

const Container = styled.div`
  padding: 10px;
  @media (min-width: 600px) {
    padding: 20px;
  } ;
`;
const Wrapper = styled.div`
  font-size: 16px;
  padding-bottom: 150px;
  margin: 0 auto;
  max-width: 1000px;
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
`;

export default App;
