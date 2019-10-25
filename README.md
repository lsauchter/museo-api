# museo API

This RESTful API controls all interactions between the frontend museo app and the database.

## Technology

The API was built using Node, Express, and Knex. The database was built using PostgreSQL

museo live page:  
[https://museo.now.sh/](https://museo.now.sh/)  
museo repo:  
[https://github.com/lsauchter/museo-client](https://github.com/lsauchter/museo-client)

---

## Using this API

### Get Museums

Returns json data about all museums between two sets of coordinates

#### URL

    /api/museums

- **Method**  
   `GET`

- **URL Params**  
   **Required**  
   `latitude=[latitude]&latitude=[latitude]`  
   `longitude=[longitude]&longitude=[longitude]`

- **Body Params**  
   None

- **Success Response**  
   Code: 200  
   Content:

  ```javascript
      {
          id: idNumber,
          mid: museumIdNumber,
          commonname: 'name',
          phone: phoneNumber,
          weburl: 'website',
          discipl: 'museum category',
          longitude: longitudeNumber,
          latitude: latitudeNumber,
          gstreet: 'street address',
          gcity: 'city name',
          gstate: 'state abbreviation',
          gzip5: 'zip code'
      }
  ```

- **Error Response**  
   Code: 500

- **Sample Call**
  ```javascript
  fetch(
    url +
      "/api/museums?longitude=-73.17812&longitude=-72.97812&latitude=40.65001&latitude=40.75001"
  ).then(response => reponse.json());
  ```
- **Sample Response**
  ```javascript
  {
      id: 2771,
      mid: 8403601669,
      commonname:	'Bronx Zoo',
      phone:	7183671010,
      weburl:	'http://bronxzoo.com/',
      discipl: 'ZAW',
      longitude: -73.87812,
      latitude: 40.85001,
      gstreet: '2300 Southern Blvd',
      gcity: 'Bronx',
      gstate:	'NY',
      gzip5: '10460'
  }
  ```
