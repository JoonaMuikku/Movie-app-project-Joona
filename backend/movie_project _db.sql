-- Drop Tables
drop table if exists users cascade;
drop table if exists groups cascade;
drop table if exists group_users cascade;
drop table if exists favorites cascade;
drop table if exists reviews cascade;
drop table if exists group_join_requests cascade;
drop table if exists group_movies cascade;
drop table if exists group_showtimes cascade;

-- Users Table
CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   first_name VARCHAR NOT NULL,
   last_name VARCHAR NOT NULL,
   email VARCHAR UNIQUE NOT NULL,
   password VARCHAR NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   username VARCHAR(50) UNIQUE NOT NULL,
   is_public BOOLEAN DEFAULT TRUE
);

-- Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,                -- Unique identifier for each review
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Foreign key to the users table. Cascade delete reviews if the user is deleted
    tmdb_id INT NOT NULL,                        -- TMDB movie ID
    movie_title VARCHAR(255),                    -- Movie title
    review_text TEXT NOT NULL,                   -- The actual review text
    rating NUMERIC(3, 1) NOT NULL,               -- Rating with one decimal place
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Review creation timestamp
    updated_at TIMESTAMP                         -- Timestamp for when the review is updated
);
-- Favorites Table
CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    tmdb_id INT NOT NULL,                     -- Reference TMDB movie ID
    poster_url TEXT,                          -- Stores the movie's poster URL
    title TEXT,                               -- Stores the movie's title
    UNIQUE (user_id, tmdb_id)                 -- Ensures no duplicate favorites for a user
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
-- Group Join Requests Table
CREATE TABLE group_join_requests (
    request_id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(group_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);

-- Group Movies Table
CREATE TABLE group_movies (
    group_movie_id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(group_id) ON DELETE CASCADE,
    tmdb_id INTEGER NOT NULL,
    added_by INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group Showtimes Table
CREATE TABLE group_showtimes (
    showtime_id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(group_id) ON DELETE CASCADE,
    movie_title VARCHAR(255) NOT NULL,
    theatre VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    added_by INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);