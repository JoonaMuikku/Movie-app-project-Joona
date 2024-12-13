# Moviq Web Application

## Project Overview

Moviq is a web-based movie application that allows users to explore movie showtimes, manage their favorite films, and share reviews with other users. The application integrates with The Movie Database (TMDB) API to fetch movie details, including posters and reviews, while utilizing the Finnkino API to provide real-time showtimes for movies in Finland. Users can create accounts, log in, and manage their favorite movies and reviews.

## Features

- **User Authentication**: Users can sign-up, log in, log out, and delete accounts.
- **Account Management**: Users can delete their account and edit their first and last name.
- **Movie Search**: Movies can be filtered by title, release year, and genre.
- **Showtimes**: Browse the Finnkino showtimes of various theaters.
- **Groups**: Signed-up users can join, create, and manage their own groups.
- **Membership Management**: Group admins can accept or decline join requests and remove existing members from the group.
- **Movie Reviews**: Signed-in users can create reviews with a comment and star rating, edit, and delete reviews.
- **Favorites**: Signed-in users can favorite movies and share a link to their favorites list.
- **Optional Features**: User profile page, group admin dashboard.

## Technologies and Tools

### Frontend

- **React**: Used to create a dynamic and interactive website.
- **Bootstrap**: For responsive and visually appealing design.
- **Axios**: Handles API requests to fetch data from external sources and backend requests.

### Backend

- **Node.js**: For server-side logic.
- **Express.js**: Simplifies frontend interaction with API.
- **PostgreSQL**: For storing and managing data.

### APIs

- **TMDB**: Fetches information about a movie, such as title, poster, and rating.
- **Finnkino**: Fetches up-to-date movie showtimes schedules.

### Development Tools

- **Bcrypt**: Hashes passwords to ensure secure user authentication.
- **Dotenv**: Stores API keys, sensitive data, and API URLs.
- **JWT (JSON Web Token)**: Implements a secure method of user authentication.
- **Mocha and Chai**: For writing and executing tests, ensuring reliable code.
- **Nodemon**: Streamlines development by automatically restarting the server on file modifications.

## Contribution

| Name                | Contribution                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Aleksi Loddo        | Wireframe, testing, backend and frontend features, managing backlog         |
| Sárah Bodová        | Frontend features, responsiveness                                            |
| Masrur Hasan        | Frontend features, responsiveness                                            |
| Sauhardha Khatri    | Backend and frontend features, managing backlog, database design, documenting REST API, database structure |
| Bidimaryam Jakipbaeva | Frontend features, responsiveness                                          |
| Joona Muikku        | Backend and frontend features                                                |

## Architecture Layer of Moviq

The relational database was implemented using PostgreSQL. Below is the database structure diagram:

### Tables Overview

- **users**: Stores user data (names, email, username, privacy preferences, and timestamps).
- **reviews**: Contains user reviews, ratings, movie titles, and timestamps.
- **favorites**: Tracks users' favorite movies (poster URLs, titles, and TMDB IDs).
- **groups**: Holds group information (ownership, group name, creation timestamps).
- **group_users**: Links users to groups (many-to-many relationship with join timestamps).
- **group_join_requests**: Manages user requests to join groups with status and timestamps.
- **group_movies**: Tracks movies added to groups with information about the user who added them and timestamps.
- **group_showtimes**: Stores showtime details for movies watched by groups, including theaters, timestamps, and related metadata.

### Foreign Key Usage

Foreign keys maintain data integrity between related tables, ensuring that relationships remain consistent. Cascading deletion is implemented to automatically remove dependent data when a related record is deleted, keeping the database clean and organized.

## Wireframe Documents

You can find wireframe documentation in the `wireframe_documents` folder.

## Local Deployment

### Installation and Usage

#### Prerequisites

- Node.js and npm installed.
- PostgreSQL database set up.

#### Steps

1. Clone the repository.
2. Navigate to the directory.
3. Install dependencies for both the frontend and backend.
4. Set up the PostgreSQL database and configure two environment variable files (`.env` files) for database connection and API keys.

#### Environment Variables

##### Backend `.env` File (Must be in root of `backend` folder):

```
PORT=3001
DB_PORT=YOUR_DATABASE_PORT
DB_HOST=YOUR_DATABASE_HOST
DB_NAME=YOUR_DATABASE_NAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
TMDB_API_KEY=YOUR_API_KEY
API_BASE_URL=YOUR_BASE_BACKEND_URL
TMDB_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN
```

##### Frontend `.env` File (Must be in `Movie-app-project` folder):

```
# Backend API URLs
REACT_APP_API_BASE_URL=YOUR_BASE_BACKEND_URL/api
REACT_APP_USER_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/users
REACT_APP_FAVORITES_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/favorites
REACT_APP_MOVIES_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/movies
REACT_APP_REVIEWS_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/reviews
REACT_APP_GENRE_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/genres
REACT_APP_SHOWTIMES_API_BASE_URL=YOUR_BASE_BACKEND_URL/api/showtimes

# TMDB API Key
REACT_APP_TMDB_API_KEY=YOUR_API_KEY

# Debug Mode
REACT_APP_DEBUG_MODE=true
```

5. Start the frontend React application and backend server with the appropriate commands.
6. Access the application at `http://localhost:{PORT}`.

## GitHub Repository

[Moviq Movie App](https://github.com/Group-10-movie-app/Moviq-movie-app.git)
