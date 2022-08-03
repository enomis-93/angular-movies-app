const PROXY_CONFIG = [
  {
    context: [
      "/film",
      "/film/all",
      "/categoria/:id",
      "/categoria/all",
      "/film/:id",
    ],
    target: "http://5b5d-87-6-192-118.ngrok.io",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
