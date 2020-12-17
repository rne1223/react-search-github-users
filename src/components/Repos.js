import React from "react";
import styled from "styled-components";

// Bring in the context with the data
import { GithubContext } from "../context/context";

// Charts
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  // extract the repos from the context
  const { repos } = React.useContext(GithubContext);

  const language_count = {};
  // Loop over to get the languages count
  repos.map((repo) => {
    isNaN(language_count[repo.language])
      ? (language_count[repo.language] = 1)
      : (language_count[repo.language] += 1);
  });

  // Format the chartData
  const chartData = [];
  for (var key in language_count) {
    if (key !== 'null') chartData.push({ label: key, value: language_count[key] });
  }

  /**   const chartData = [
    {
      label: "Html",
      value: "13",
    },
    {
      label: "CSS",
      value: "115",
    },
    {
      label: "C++",
      value: "180",
    },
   ];
  //*/
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={chartData} />
        <ExampleChart data={chartData} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
