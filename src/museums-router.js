const express = require("express");
const xss = require("xss");
const MuseumsService = require("./museums-service");
const museumsRouter = express.Router();

const sanitizeMuseums = museum => ({
  id: museum.id,
  mid: Number(museum.mid),
  discipl: xss(museum.discipl),
  commonname: xss(museum.commonname),
  phone: xss(museum.phone),
  weburl: xss(museum.weburl),
  longitude: Number(museum.longitude),
  latitude: Number(museum.latitude),
  gstreet: xss(museum.gstreet),
  gcity: xss(museum.gcity),
  gstate: xss(museum.gstate),
  gzip5: xss(museum.gzip5)
});

//for correcting db strings from being all upper case//
const formatString = word => {
  if (word === "PO") {
    return word;
  } else {
    const lowerWord = word.toLowerCase();
    const letters = lowerWord.split("");
    const upper = letters.shift().toUpperCase();
    letters.unshift(upper);
    const formattedWord = letters.join("");
    return formattedWord;
  }
};

museumsRouter.route("/").get((req, res, next) => {
  const { latitude, longitude } = req.query;

  if (!latitude || latitude.length !== 2) {
    return res.status(400).json({
      error: { message: "Must include two latitudes in request query" }
    });
  }
  if (!longitude || longitude.length !== 2) {
    return res.status(400).json({
      error: { message: "Must include two longitudes in request query" }
    });
  }

  const lat = latitude.map(num => Number(num)).sort((a, b) => a - b);
  const lon = longitude.map(num => Number(num)).sort((a, b) => a - b);

  //data is spread across 3 databases - all 3 must be queried before sending response//
  const getData1 = MuseumsService.getMuseums(
    req.app.get("db1"),
    lat[0],
    lat[1],
    lon[0],
    lon[1]
  )
    .then(museums => {
      return museums;
    })
    .catch(next);

  const getData2 = MuseumsService.getMuseums(
    req.app.get("db2"),
    latitude[0],
    latitude[1],
    longitude[0],
    longitude[1]
  )
    .then(museums => {
      return museums;
    })
    .catch(next);

  const getData3 = MuseumsService.getMuseums(
    req.app.get("db3"),
    latitude[0],
    latitude[1],
    longitude[0],
    longitude[1]
  )
    .then(museums => {
      return museums;
    })
    .catch(next);

  Promise.all([getData1, getData2, getData3])
    .then(museums => {
      const allMuseums = [...museums[0], ...museums[1], ...museums[2]];

      //formatting data from the all uppercase db format//
      allMuseums.forEach(museum => {
        const nameWords = museum.commonname.split(" ");
        const formattedName = nameWords.map(word => formatString(word));
        const name = formattedName.join(" ");
        museum.commonname = name;

        if (museum.phone !== " ") {
          const numbers = museum.phone.split("");
          const areaCode = numbers[0] + numbers[1] + numbers[2];
          const first3 = numbers[3] + numbers[4] + numbers[5];
          const last4 = numbers[6] + numbers[7] + numbers[8] + numbers[9];
          const phoneNumber = `(${areaCode})${first3}-${last4}`;
          museum.phone = phoneNumber;
        }

        museum.weburl = museum.weburl.toLowerCase();

        const streetWords = museum.gstreet.split(" ");
        const formattedStreet = streetWords.map(word => formatString(word));
        const street = formattedStreet.join(" ");
        museum.gstreet = street;

        const cityWords = museum.gcity.split(" ");
        const formattedCity = cityWords.map(word => formatString(word));
        const city = formattedCity.join(" ");
        museum.gcity = city;
      });
      res.json(allMuseums.map(sanitizeMuseums));
    })
    .catch(next);
});

module.exports = museumsRouter;
