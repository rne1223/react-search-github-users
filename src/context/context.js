import React, {useState, useEffect} from 'react';

// Import the mock data api
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider
const GithubProvider = ({children}) => {
  
    // Getting mocked data from filesystem
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    return (
      <GithubContext.Provider value={{githubUser, repos, followers}}>{children}</GithubContext.Provider>
    );
};

export {GithubContext, GithubProvider};