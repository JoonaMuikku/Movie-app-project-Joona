import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD:movie_app_project/src/App.js
import Header from './Components/Header/Header';
=======
import Header from './components/Header/Header.jsx';
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/App.js
import HomeView from './views/HomeView';
import SignInView from './views/SignUpandinview/SignInView.jsx';
import SignUpView from './views/SignUpandinview/SignUpView.jsx';
import MoviesView from './views/MoviesView';
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import SearchView from './views/SearchView';
<<<<<<< HEAD:movie_app_project/src/App.js
import Footer from './Components/Footer/Footer';
=======
import Footer from './components/Footer/Footer.jsx';
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/App.js

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
<<<<<<< HEAD:movie_app_project/src/App.js
        </Routes>
          <Footer />
      </Router>
    </div>
  );
  
=======
          <Route path="/search/:query" element={<SearchView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/App.js
}