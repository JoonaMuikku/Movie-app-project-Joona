import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header/Header';
import HomeView from './views/HomeView';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import MoviesView from './views/MoviesView';
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import SearchView from './views/SearchView';
import Footer from './Components/Footer/Footer';

export default function App() {
  return (
<div className="App bg-dark text-white">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/sign-in" element={<SignInView />} />
          <Route path="/sign-up" element={<SignUpView />} />
          <Route path="/movies" element={<MoviesView />} />
          <Route path="/groups" element={<GroupsView />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchView />} />
        </Routes>
          <Footer />
      </Router>
    </div>
  );
  
}