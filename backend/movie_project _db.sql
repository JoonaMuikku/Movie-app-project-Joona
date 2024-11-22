-- Users Table
CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   first_name VARCHAR NOT NULL,
   last_name VARCHAR NOT NULL,
   email VARCHAR UNIQUE NOT NULL,
   password VARCHAR NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Groups Table
CREATE TABLE groups (
   group_id SERIAL PRIMARY KEY,
   owner_id INTEGER REFERENCES users(user_id),
   group_name VARCHAR NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group_Users Table
CREATE TABLE group_users (
   group_id INTEGER REFERENCES groups(group_id),
   user_id INTEGER REFERENCES users(user_id),
   joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (group_id, user_id)
);

-- Movies Table
CREATE TABLE movies (
   movie_id SERIAL PRIMARY KEY,
   title VARCHAR NOT NULL,
   description TEXT,
   release_date DATE,
   genre VARCHAR,
   rating DECIMAL NOT NULL DEFAULT 0.0
);

-- Favorites Table 
CREATE TABLE favorites (
   favorite_id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users(user_id),
   movie_id INTEGER REFERENCES movies(movie_id),
   added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users(user_id),
   movie_id INTEGER REFERENCES movies(movie_id),
   description TEXT,
   rating INTEGER CHECK (rating BETWEEN 1 AND 5),
   shared_url VARCHAR,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Showtimes Table
CREATE TABLE showtimes (
   showtime_id SERIAL PRIMARY KEY,
   movie_id INTEGER REFERENCES movies(movie_id),
   theater_name VARCHAR NOT NULL,
   showtime_date DATE NOT NULL,
   showtime_time TIME NOT NULL
);
