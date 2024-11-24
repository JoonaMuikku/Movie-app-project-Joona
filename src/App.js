import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header/Header';
import HomeView from './views/HomeView';
import SignInView from './views/SignUpandinview/SignInView';
import MoviesView from './views/MoviesView';
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import Footer from './components/Footer/Footer'
import LogoutView from './views/LogoutView';
import SignUpView from './views/SignUpandinview/SignUpView';
import SearchView from './views/SearchView';


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
          <Route path="/logout" element={<LogoutView />} />
          <Route path="/search" element={<SearchView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
  
}

