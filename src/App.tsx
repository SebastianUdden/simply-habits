import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
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

export const HOME = "home";
export const TODOS = "todos";
export const CHEAT_SHEET = "cheat sheet";
export const SCORECARD = "scorecard";
export const HABIT_INTENTIONS = "habit intentions";

const defaultHabitIntentions = {
  desired: [],
  undesired: [],
  achieved: [],
};

const tabs = [
  { icon: home, text: HOME },
  { icon: assignmentTurnedIn, text: TODOS },
  { icon: assignment, text: CHEAT_SHEET },
  { icon: insertChart, text: SCORECARD },
  { icon: dynamicFeed, text: HABIT_INTENTIONS },
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
      <Wrapper>
        {tab === HOME && <Home />}
        {tab === TODOS && <Todos />}
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
            habitIntentions={habits?.habitIntentions || defaultHabitIntentions}
            onSave={(habitIntentions: HabitProps[]) =>
              setHabits({ ...habits, habitIntentions })
            }
          />
        )}
        <Navigation tab={tab} tabs={tabs} onTabChange={(t: any) => setTab(t)} />
      </Wrapper>
    </Theme>
  );
};

const Wrapper = styled.div`
  padding: 100px 40px 150px;
  font-size: 16px;
  padding-bottom: 150px;
  margin: 0 auto;
  max-width: 1000px;
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
`;

export default App;
