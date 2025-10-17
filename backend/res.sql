CREATE TABLE IF NOT EXISTS reservations (
    id BIGSERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' in email) > 1 ), 
    checkin DATE NOT NULL,
    checkout DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS passwordz (
    id BIGSERIAL PRIMARY KEY,
    passwordz TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    review TEXT NOT NULL,
    username VARCHAR(40)
);