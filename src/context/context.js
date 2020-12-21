import React, { useState, useEffect } from "react";

// Import the mock data api
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
// import { AsyncLocalStorage } from "async_hooks";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider
const GithubProvider = ({ children }) => {
  // Getting mocked data from filesystem
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //request loading data
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // reset error and add the loading gif
    toggleError();
    setIsLoading(true);

    // get user general information 
    const response = await axios(`${rootUrl}/users/${user}`)
    .catch(err => console.log(err));

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      // Send requests for followers and repos and wait for the response
      await Promise.allSettled([
        axios(`${followers_url}?per_page=100`),
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
      ])
      .then(result => {
        const [followers, repos] = result;
        const status = 'fulfilled';

        if(repos.status === status){
          setRepos(repos.value.data);
        }

        if(followers.status === status){
          setFollowers(followers.value.data);
        }
      })
      .catch(err => console.log(err));

    } else {
      toggleError(true, "there is no user with that username");
    }

    checkRequests();
    setIsLoading(false);
  };

  // Check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate: { remaining } } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
