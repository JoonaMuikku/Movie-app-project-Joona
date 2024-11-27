import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomeView from './views/HomeView';
import SignInView from './views/SignUpandinview/SignInView.jsx';
import SignUpView from './views/SignUpandinview/SignUpView.jsx';
import MoviesView from './views/MoviesView';
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
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
          <Route path="/search" element={<SearchView />} />
          <Route path="/search/:query" element={<SearchView />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-center" autoClose={2000} /> {/* Add ToastContainer */}
    </div>
  );
}