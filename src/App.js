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
import GroupsView from './views/GroupsView';
import MovieDetails from './views/MovieDetailsView/MovieDetails';
import SearchView from './views/SearchView';
import ReviewsList from "./views/ReviewList/ReviewsList";
import GroupDetails from './views/GroupDetailsView.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import GroupAdminView from './views/GroupAdminView';
import ShowtimesView from './views/Showtimes/ShowtimesView.jsx';
import SharedFavorites from './views/SharedFavorites/SharedFavorites.jsx';

// Added imports for ShowtimesContext and ShowtimesHomeView
import ShowtimesHomeView from './components/Showtimes_home_page/Showtime_homeView.jsx';
import ShowtimesProvider from './context/ShowtimesContext';

export default function App() {
  return (
    <ShowtimesProvider> {/* Add ShowtimesProvider to provide context */}
      <div className="App bg-dark text-white">
        <Router>
          <div>
            <Header />
          </div>
          <main>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/sign-in" element={<SignInView />} />
              <Route path="/sign-up" element={<SignUpView />} />
              <Route path="/groups" element={<GroupsView />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/groups/:id" element={<GroupDetails />} />
              <Route path="/groups/:id/admin" element={<PrivateRoute><GroupAdminView /></PrivateRoute>} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/search/:query" element={<SearchView />} />
              <Route path="/reviews" element={<ReviewsList />} />
              <Route path="/showtimes" element={<ShowtimesView />} />
              <Route path="/showtimes-home" element={<ShowtimesHomeView />} /> {/* Added ShowtimesHomeView */}
              <Route path="/shared/:username" element={<SharedFavorites />} />
            </Routes>
          </main>
          <Footer />
        </Router>
        <ToastContainer position="top-center" autoClose={2000} /> {/* Add ToastContainer */}
      </div>
    </ShowtimesProvider>
  );
}
