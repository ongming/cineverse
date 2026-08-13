-- =========================================================
-- CINEVERSE DATABASE
-- PostgreSQL
-- =========================================================

-- =========================================================
-- 1. USERS
-- =========================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- 2. MOVIES
-- =========================================================

CREATE TYPE release_status_enum AS ENUM (
    'Rumored',
    'Planned',
    'In Production',
    'Post Production',
    'Released',
    'Canceled'
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY, -- TMDb movie ID

    title VARCHAR(255) NOT NULL,
    overview TEXT,

    release_date DATE,
    runtime INTEGER,

    vote_average NUMERIC(3,1) DEFAULT 0,
    vote_count INTEGER DEFAULT 0,

    poster_path VARCHAR(255),

    budget BIGINT DEFAULT 0,
    revenue BIGINT DEFAULT 0,

    country VARCHAR(100),
    age_rating VARCHAR(10),

    release_status release_status_enum,

    director_name VARCHAR(255),

    imdb_id VARCHAR(20),

    popularity NUMERIC(10,3) DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_movies_release_date
ON movies(release_date);

CREATE INDEX idx_movies_vote_average
ON movies(vote_average DESC);

CREATE INDEX idx_movies_popularity
ON movies(popularity DESC);


-- =========================================================
-- 3. MOVIE IMAGES
-- =========================================================

CREATE TYPE image_type_enum AS ENUM (
    'backdrop',
    'poster'
);

CREATE TABLE movie_images (
    id SERIAL PRIMARY KEY,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    file_path VARCHAR(255) NOT NULL,

    type image_type_enum NOT NULL,

    width INTEGER,
    height INTEGER,

    vote_average NUMERIC(3,1) DEFAULT 0,

    display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_movie_images_movie_id
ON movie_images(movie_id);


-- =========================================================
-- 4. TRAILERS
-- =========================================================

CREATE TABLE trailers (
    id SERIAL PRIMARY KEY,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    youtube_key VARCHAR(50) NOT NULL,

    name VARCHAR(255),

    type VARCHAR(30),

    published_at TIMESTAMPTZ
);

CREATE INDEX idx_trailers_movie_id
ON trailers(movie_id);


-- =========================================================
-- 5. GENRES
-- =========================================================

CREATE TABLE genres (
    id INTEGER PRIMARY KEY, -- TMDb genre ID

    name VARCHAR(100) NOT NULL
);

CREATE TABLE movie_genres (
    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    genre_id INTEGER NOT NULL
        REFERENCES genres(id)
        ON DELETE CASCADE,

    PRIMARY KEY (movie_id, genre_id)
);

CREATE INDEX idx_movie_genres_genre_id
ON movie_genres(genre_id);


-- =========================================================
-- 6. ACTORS
-- =========================================================

CREATE TABLE actors (
    id INTEGER PRIMARY KEY, -- TMDb person ID

    name VARCHAR(255) NOT NULL,

    profile_path VARCHAR(255),

    popularity NUMERIC(10,3) DEFAULT 0,

    biography TEXT
);

CREATE TABLE movie_cast (
    id SERIAL PRIMARY KEY,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    actor_id INTEGER NOT NULL
        REFERENCES actors(id)
        ON DELETE CASCADE,

    character_name VARCHAR(255),

    cast_order INTEGER DEFAULT 0,

    UNIQUE (movie_id, actor_id)
);

CREATE INDEX idx_movie_cast_movie_id
ON movie_cast(movie_id);

CREATE INDEX idx_movie_cast_actor_id
ON movie_cast(actor_id);


-- =========================================================
-- 7. WATCHLIST
-- =========================================================

CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE (user_id, movie_id)
);

CREATE INDEX idx_watchlist_user_id
ON watchlist(user_id);

CREATE INDEX idx_watchlist_movie_id
ON watchlist(movie_id);


-- =========================================================
-- 8. RATINGS
-- =========================================================

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    score NUMERIC(3,1) NOT NULL
        CHECK (score >= 0 AND score <= 10),

    comment TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE (user_id, movie_id)
);

CREATE INDEX idx_ratings_movie_id
ON ratings(movie_id);

CREATE INDEX idx_ratings_user_id
ON ratings(user_id);


-- =========================================================
-- 9. NEWS
-- =========================================================

CREATE TABLE news (
    id SERIAL PRIMARY KEY,

    title VARCHAR(500) NOT NULL,

    link VARCHAR(500) UNIQUE NOT NULL,

    summary TEXT,

    source VARCHAR(100),

    related_movie INTEGER
        REFERENCES movies(id)
        ON DELETE SET NULL,

    published_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_news_related_movie
ON news(related_movie);

CREATE INDEX idx_news_published_at
ON news(published_at DESC);


-- =========================================================
-- 10. TRENDING WEEKLY MOVIES
-- =========================================================

CREATE TABLE trending_weekly (
    id SERIAL PRIMARY KEY,

    movie_id INTEGER NOT NULL
        REFERENCES movies(id)
        ON DELETE CASCADE,

    trending_rank INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE (movie_id)
);

CREATE INDEX idx_trending_weekly_rank
ON trending_weekly(trending_rank ASC);


-- =========================================================
-- 10. FUNCTION: AUTO UPDATE updated_at
-- =========================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =========================================================
-- 11. TRIGGERS
-- =========================================================

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_movies_updated_at
BEFORE UPDATE ON movies
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_ratings_updated_at
BEFORE UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();