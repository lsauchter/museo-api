copy museums(MID, DISCIPL, COMMONNAME, PHONE, WEBURL, LONGITUDE, LATITUDE, GSTREET, GCITY, GSTATE, GZIP5)
from '~/museo-api/seeds/museums1.csv' WITH (FORMAT CSV, HEADER)