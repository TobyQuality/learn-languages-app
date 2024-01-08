@mydb.tamk.fi@3310
CREATE TABLE english (
    id INTEGER(21) NOT NULL AUTOINCREMENT,
    word VARCHAR(255) NOT NULL,
    tags_id INTEGER,
    UNIQUE (word),
    PRIMARY KEY (id),
    FOREIGN KEY (tags_id) REFERENCES tags(id)

);