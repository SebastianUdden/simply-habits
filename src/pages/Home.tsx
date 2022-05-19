import styled from "styled-components";
import ImportExport from "../components/ImportExport";

const Link = ({ href, text }: { href: string; text: string }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    {text}
  </a>
);

const Home = () => {
  return (
    <Wrapper>
      <h1>SimplyHabits</h1>
      <ul>
        <li>
          <Link
            href="https://www.youtube.com/watch?v=U_nzqnXWvSo"
            text="Atomic habits video - short"
          />
        </li>
        <li>
          <Link
            href="https://www.youtube.com/watch?v=g2S2mhOisso"
            text="Atomic habits video - long"
          />
        </li>
        <li>
          <Link
            href="https://jamesclear.com/articles"
            text="Article categories"
          />
        </li>
        <ul>
          <li>
            <Link href="https://jamesclear.com/creativity" text="Creativity" />
          </li>
          <li>
            <Link
              href="https://jamesclear.com/decision-making"
              text="Decision making"
            />
          </li>
          <li>
            <Link href="https://jamesclear.com/focus" text="Focus" />
          </li>
          <li>
            <Link
              href="https://jamesclear.com/life-lessons"
              text="Life lessons"
            />
          </li>
          <li>
            <Link href="https://jamesclear.com/motivation" text="Motivation" />
          </li>
          <li>
            <Link
              href="https://jamesclear.com/productivity"
              text="Productivity"
            />
          </li>
          <li>
            <Link
              href="https://jamesclear.com/self-improvement"
              text="Self improvement"
            />
          </li>
        </ul>
        <li>
          <Link
            href="https://jamesclear.com/atomic-habits/resources"
            text="Resources"
          />
        </li>
        <ul>
          <li>
            Primary resources
            <ul>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/The+Habit+Loop.pdf"
                  text="Habit loop"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Habits+Cheat+Sheet.pdf"
                  text="Habits Cheat Sheet"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Media.pdf"
                  text="Media"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Questions+and+Answers.pdf"
                  text="Questions and answers"
                />
              </li>
              <li>
                <Link
                  href="https://jamesclear.com/atomic-habits/personality"
                  text="Personality tests"
                />
              </li>
              <li>
                <Link
                  href="https://jamesclear.com/atomic-habits/endnotes"
                  text="Endnotes"
                />
              </li>
            </ul>
          </li>
          <li>
            Templates
            <ul>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/The+Habits+Scorecard.pdf"
                  text="Habits Scorecard"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Implementation+Intentions.pdf"
                  text="Implementation Intentions"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Habit+Stack.pdf"
                  text="Habit Stack"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Habit+Tracker.pdf"
                  text="Habit Tracker"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Habit+Contract.pdf"
                  text="Habit Contract"
                />
              </li>
            </ul>
          </li>
          <li>
            Bonus chapters
            <ul>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Business+Appendix.pdf"
                  text="Business Appendix"
                />
              </li>
              <li>
                <Link
                  href="https://s3.amazonaws.com/jamesclear/Atomic+Habits/Parenting+Appendix.pdf"
                  text="Parenting Appendix"
                />
              </li>
            </ul>
          </li>
        </ul>
      </ul>
      <hr />
      <ImportExport />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    padding: 2px 20px;
    li {
      padding: 5px;
    }
  }
  a {
    color: ${(p) => p.theme.background.color};
    font-size: 16px;
    text-underline-offset: 5px;
    text-decoration-color: #d5d5d5;
    :hover {
      color: ${(p) => p.theme.secondaryVariant.bgColor};
    }
  }
`;

export default Home;
