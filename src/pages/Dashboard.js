import React from "react";
import { Navbar, Search, Info, User, Repos } from "../components";
import {GithubContext} from '../context/context';
import loadingImage from '../images/preloader.gif';

const Dashboard = () => {
  const {isLoading } = React.useContext(GithubContext);

  if(isLoading){
    return <main>
      <Navbar/>
      <Search/>
      <img src={loadingImage} className="loading-img" alt="loading"/>
    </main>
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
