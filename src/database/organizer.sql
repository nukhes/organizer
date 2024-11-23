CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    hash TEXT NOT NULL
);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    streak INTEGER NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    details TEXT,
    date DATE,
    status BOOL DEFAULT 0,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);