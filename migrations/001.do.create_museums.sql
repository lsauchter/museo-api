CREATE TABLE museums (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    MID BIGINT NOT NULL,
    DISCIPL TEXT NOT NULL,
    COMMONNAME TEXT NOT NULL,
    PHONE TEXT,
    WEBURL TEXT,
    LONGITUDE DECIMAL NOT NULL,
    LATITUDE DECIMAL NOT NULL,
    GSTREET TEXT,
    GCITY TEXT,
    GSTATE TEXT,
    GZIP5 TEXT
);