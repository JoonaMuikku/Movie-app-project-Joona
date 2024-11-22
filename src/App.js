import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderView from './components/Header/HeaderView';
import HomeView from './views/HomeView';
import SignInView from './views/SignInView';
import MoviesView from './views/MoviesView';
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import Footer from './components/Footer/Footer'
import LogoutView from './views/LogoutView';

export default function App() {

  return (
    <div className="App bg-dark text-white">
      <Router>
        <HeaderView />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/sign-in" element={<SignInView />} />
          <Route path="/movies" element={<MoviesView />} />
          <Route path="/groups" element={<GroupsView />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/logout" element={<LogoutView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
  
}

