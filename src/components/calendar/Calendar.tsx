import styled from "styled-components";
import moment from "moment";
import { useState } from "react";

const firstDayOfMonth = (date: any) =>
  moment(date).startOf("month").format("d");

const getBlanks = (firstDayOfMonth: number) => {
  const blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<Empty>{""}</Empty>);
  }
  return blanks;
};

const getYears = (year: number) => {
  const modifier = 11;
  const years = [];
  for (let i = -1; i < modifier; i++) {
    years.push(year + i);
  }
  return years;
};

const getCurrentDate = (dateObject: any, today: any) => {
  if (
    dateObject.format("MMMM") === today.format("MMMM") &&
    dateObject.format("Y") === today.format("Y")
  ) {
    return +dateObject.format("D");
  }
  return -1;
};

interface Props {
  dates: any;
}

const Calendar = ({ dates = [] }: Props) => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [dateObject, setDateObject] = useState(moment());
  const allMonths = moment.months();
  const yearTable = getYears(+moment().format("Y"));
  const weekdaysShort = moment.weekdaysShort();

  const currentMoment = moment();
  const thisMonth = currentMoment.format("MMMM");
  const thisYear = currentMoment.format("Y");
  const selectedMonth = dateObject.format("MMMM");
  const selectedYear = dateObject.format("Y");

  const handleMonthChange = (i: number) => {
    setSelectedDate(0);
    setDateObject(moment(dateObject).set("month", i));
  };
  const handleYearChange = (year: number) => {
    setSelectedDate(0);
    setDateObject(moment(dateObject).set("year", year));
    setShowMonths(true);
  };
  const handlePrev = () => {
    setSelectedDate(0);
    setDateObject(moment(dateObject.subtract(1, showYears ? "year" : "month")));
  };
  const handleNext = () => {
    setSelectedDate(0);
    setDateObject(moment(dateObject.add(1, showYears ? "year" : "month")));
  };

  const getDays = (daysInMonth: number) => {
    const momentDates = dates.map((dt: string) => moment(dt));
    const currentDate = getCurrentDate(dateObject, currentMoment);
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const match = momentDates.filter(
        (md: any) =>
          md.format("MMMM") === selectedMonth &&
          md.format("Y") === selectedYear &&
          +md.format("D") === d
      );
      if (d === currentDate) {
        days.push(
          <Today
            key={d}
            onClick={() => setSelectedDate(d)}
            isSelected={selectedDate === d}
            isMatch={match.length}
          >
            {d}
            {match.length !== 0 && <Circle>{match.length}</Circle>}
          </Today>
        );
      } else {
        days.push(
          <Day
            key={d}
            onClick={() => setSelectedDate(d)}
            isSelected={selectedDate === d}
            isMatch={match.length}
          >
            {d}
            {match.length !== 0 && <Circle>{match.length}</Circle>}
          </Day>
        );
      }
    }
    return days;
  };

  const blanks = getBlanks(+firstDayOfMonth(dateObject));
  const days = getDays(dateObject.daysInMonth());

  return (
    <Wrapper>
      <Flex>
        <Arrow onClick={() => handlePrev()}>&larr;</Arrow>
        <Month
          onClick={() => {
            setShowMonths(!showMonths);
            setShowYears(false);
          }}
        >
          {selectedMonth}
        </Month>
        <Year
          onClick={() => {
            setShowYears(!showYears);
            setShowMonths(false);
          }}
        >
          {selectedYear}
        </Year>
        <Arrow onClick={() => handleNext()}>&rarr;</Arrow>
      </Flex>
      <Head>
        {showMonths && <Title>Select a month</Title>}
        {showYears && <Title>Select a year</Title>}
        {!showMonths &&
          !showYears &&
          weekdaysShort.map((day) => <div>{day}</div>)}
      </Head>
      {showMonths && (
        <Months>
          {allMonths.map((m, i) => (
            <Month
              key={m}
              isCurrent={thisMonth === m}
              onClick={() => {
                setShowMonths(false);
                handleMonthChange(i);
              }}
            >
              {m}
            </Month>
          ))}
        </Months>
      )}
      {showYears && (
        <Months>
          {yearTable.map((y) => (
            <Month
              isCurrent={+thisYear === y}
              onClick={() => {
                setShowYears(false);
                handleYearChange(y);
              }}
            >
              {y}
            </Month>
          ))}
        </Months>
      )}
      {!showMonths && !showYears && (
        <Body>
          {blanks}
          {days}
        </Body>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  border: none;
  background-color: inherit;
  padding: 20px 25px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  :active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;
const Month = styled(Button)<{ isCurrent?: boolean }>`
  flex: 1;
  ${(p) =>
    p.isCurrent &&
    `
        background-color: ${p.theme.primary.bgColor};
        color: ${p.theme.primary.color};
  `}
`;
const Year = styled(Button)`
  flex: 1;
`;
const Months = styled.div`
  div {
    text-align: center;
  }
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 400px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Head = styled.div`
  box-sizing: border-box;
  display: flex;
  div {
    flex: 1;
    box-sizing: border-box;
    background-color: ${(p) => p.theme.secondary.bgColor};
    color: ${(p) => p.theme.secondary.color};
    padding: 20px 0;
    text-align: center;
  }
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  div {
    padding: 20px 0;
    text-align: center;
  }
`;
const Empty = styled.div`
  flex: 1;
`;
const Day = styled.div<{ isSelected: boolean; isMatch: boolean }>`
  position: relative;
  flex: 1;
  cursor: pointer;
  user-select: none;
  /* :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  } */
  ${(p) =>
    p.isMatch &&
    `
    background-color: ${p.theme.secondary.bgColor};
    color: ${p.theme.secondary.color};
  `}
  ${(p) =>
    p.isSelected &&
    `
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    `} /* :hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    } */
`;
const Today = styled(Day)`
  background-color: ${(p) => p.theme.primary.bgColor};
  color: ${(p) => p.theme.primary.color};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  } */
  ${(p) =>
    p.isMatch &&
    `
    background-color: ${p.theme.secondary.bgColor};
    color: ${p.theme.secondary.color};
  `}
  ${(p) =>
    p.isSelected &&
    `
    background-color: ${p.theme.secondary.bgColor};
    color: ${p.theme.secondary.color};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  `}
`;
const Title = styled.div`
  padding: 20px;
  font-weight: 700;
  background-color: ${(p) => p.theme.secondary.bgColor};
  color: ${(p) => p.theme.secondary.color};
`;
const Arrow = styled(Button)``;
const Circle = styled.span`
  position: absolute;
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 50%;
  line-height: 22px;
  height: 22px;
  width: 22px;
  right: 3px;
  bottom: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${(p) => p.theme.background.bgColor};
  color: ${(p) => p.theme.background.color};
`;

export default Calendar;
