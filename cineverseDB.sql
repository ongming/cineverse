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

    genre_ids INTEGER[],

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_movies_release_date
ON movies(release_date);

CREATE INDEX idx_movies_vote_average
ON movies(vote_average DESC);

CREATE INDEX idx_movies_popularity
ON movies(popularity DESC);

CREATE INDEX idx_movies_revenue
ON movies(revenue DESC, budget) WHERE budget > 0;


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

    biography TEXT,

    birthday DATE,

    deathday DATE,

    place_of_birth VARCHAR(255),

    gender SMALLINT,

    imdb_id VARCHAR(50),

    popular_rank INTEGER
);

CREATE TABLE actor_images (
    id SERIAL PRIMARY KEY,

    actor_id INTEGER NOT NULL
        REFERENCES actors(id)
        ON DELETE CASCADE,

    file_path VARCHAR(255) NOT NULL,

    width INTEGER,
    height INTEGER,
    vote_average NUMERIC(3,1) DEFAULT 0,
    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_actor_images_actor_id
ON actor_images(actor_id);

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
-- 11. STORED FUNCTION: GET ALL MOVIE DETAILS BY ID
-- =========================================================

CREATE OR REPLACE FUNCTION get_movie_details_by_id(p_movie_id INT)
RETURNS TABLE (
    id INT,
    title VARCHAR,
    overview TEXT,
    release_date DATE,
    runtime INT,
    vote_average NUMERIC,
    vote_count INT,
    poster_path VARCHAR,
    banner VARCHAR,
    budget BIGINT,
    revenue BIGINT,
    country VARCHAR,
    age_rating VARCHAR,
    release_status release_status_enum,
    director_name VARCHAR,
    imdb_id VARCHAR,
    popularity NUMERIC,
    genres JSONB,
    trailers JSONB,
    images JSONB,
    cast_members JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id,
        m.title,
        m.overview,
        m.release_date,
        m.runtime,
        m.vote_average,
        m.vote_count,
        m.poster_path,
        mi_banner.file_path AS banner,
        m.budget,
        m.revenue,
        m.country,
        m.age_rating,
        m.release_status,
        m.director_name,
        m.imdb_id,
        m.popularity,
        COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'id', g.id,
                'name', g.name
            ))
            FROM movie_genres mg
            JOIN genres g ON g.id = mg.genre_id
            WHERE mg.movie_id = m.id
        ), '[]'::jsonb) AS genres,
        COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'id', t.id,
                'youtube_key', t.youtube_key,
                'name', t.name,
                'type', t.type,
                'published_at', t.published_at
            ) ORDER BY t.id ASC)
            FROM trailers t
            WHERE t.movie_id = m.id
        ), '[]'::jsonb) AS trailers,
        COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'id', img.id,
                'file_path', img.file_path,
                'type', img.type,
                'width', img.width,
                'height', img.height,
                'vote_average', img.vote_average
            ) ORDER BY img.display_order ASC)
            FROM movie_images img
            WHERE img.movie_id = m.id
        ), '[]'::jsonb) AS images,
        COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
                'id', a.id,
                'name', a.name,
                'profile_path', a.profile_path,
                'character_name', mc.character_name,
                'cast_order', mc.cast_order
            ) ORDER BY mc.cast_order ASC)
            FROM movie_cast mc
            JOIN actors a ON a.id = mc.actor_id
            WHERE mc.movie_id = m.id
        ), '[]'::jsonb) AS cast_members
    FROM movies m
    LEFT JOIN LATERAL (
        SELECT mi_sub.file_path 
        FROM movie_images mi_sub
        WHERE mi_sub.movie_id = m.id AND mi_sub.type = 'backdrop' 
        ORDER BY mi_sub.display_order ASC, mi_sub.vote_average DESC 
        LIMIT 1
    ) mi_banner ON true
    WHERE m.id = p_movie_id;
END;
$$ LANGUAGE plpgsql;


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