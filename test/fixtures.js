function makeMuseumsArray() {
  return [
    {
      mid: 8403601669,
      commonname: "BRONX ZOO",
      phone: 7183671010,
      weburl: "HTTP://BRONXZOO.COM/",
      discipl: "ZAW",
      longitude: -73.87812,
      latitude: 40.85001,
      gstreet: "2300 SOUTHERN BLVD",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10460"
    },
    {
      mid: 8403602023,
      commonname: "BRONX CHILDREN'S MUSEUM",
      phone: 3479712155,
      weburl: " ",
      discipl: "NAT",
      longitude: -73.92117,
      latitude: 40.82454,
      gstreet: "PO BOX 1381",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10451"
    }
  ];
}

function makeFullMuseumsArray() {
  return [
    {
      mid: 8403601669,
      commonname: "BRONX ZOO",
      phone: 7183671010,
      weburl: "HTTP://BRONXZOO.COM/",
      discipl: "ZAW",
      longitude: -73.87812,
      latitude: 40.85001,
      gstreet: "2300 SOUTHERN BLVD",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10460"
    },
    {
      mid: 8403602023,
      commonname: "BRONX CHILDREN'S MUSEUM",
      phone: 3479712155,
      weburl: " ",
      discipl: "NAT",
      longitude: -73.92117,
      latitude: 40.82454,
      gstreet: "PO BOX 1381",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10451"
    },
    {
      mid: 8403601669,
      commonname: "BRONX ZOO",
      phone: 7183671010,
      weburl: "HTTP://BRONXZOO.COM/",
      discipl: "ZAW",
      longitude: -73.87812,
      latitude: 40.85001,
      gstreet: "2300 SOUTHERN BLVD",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10460"
    },
    {
      mid: 8403602023,
      commonname: "BRONX CHILDREN'S MUSEUM",
      phone: 3479712155,
      weburl: " ",
      discipl: "NAT",
      longitude: -73.92117,
      latitude: 40.82454,
      gstreet: "PO BOX 1381",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10451"
    },
    {
      mid: 8403601669,
      commonname: "BRONX ZOO",
      phone: 7183671010,
      weburl: "HTTP://BRONXZOO.COM/",
      discipl: "ZAW",
      longitude: -73.87812,
      latitude: 40.85001,
      gstreet: "2300 SOUTHERN BLVD",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10460"
    },
    {
      mid: 8403602023,
      commonname: "BRONX CHILDREN'S MUSEUM",
      phone: 3479712155,
      weburl: " ",
      discipl: "NAT",
      longitude: -73.92117,
      latitude: 40.82454,
      gstreet: "PO BOX 1381",
      gcity: "BRONX",
      gstate: "NY",
      gzip5: "10451"
    }
  ];
}

function makeMaliciousMuseum() {
  const maliciousMuseum = {
    mid: 8403601669,
    commonname: 'Malicious <script>alert("xss");</script>',
    phone: 7183671010,
    weburl: "HTTP://BRONXZOO.COM/",
    discipl: "ZAW",
    longitude: -73.87812,
    latitude: 40.85001,
    gstreet:
      'SOUTHERN BLVD <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">',
    gcity: "BRONX",
    gstate: "NY",
    gzip5: "10460"
  };
  const expectedMuseum = {
    ...maliciousMuseum,
    commonname: 'Malicious &lt;script&gt;alert("xss");&lt;/script&gt;',
    weburl: "http://bonxzoo.com/",
    gstreet:
      'Southern Blvd <img src="https://url.to.file.which/does-not.exist">',
    gcity: "Bronx"
  };
  return {
    maliciousMuseum,
    expectedMuseum
  };
}

module.exports = {
  makeMuseumsArray,
  makeFullMuseumsArray,
  makeMaliciousMuseum
};
