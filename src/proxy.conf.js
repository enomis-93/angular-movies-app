const PROXY_CONFIG = [
  {
    context: [
      "/film",
      "/film/all",
      "/categoria/:id",
      "/categoria/all",
      "/film/:id",
    ],
    target: "https://cc45-176-62-159-134.eu.ngrok.io",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
