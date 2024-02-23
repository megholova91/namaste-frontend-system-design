const express = require("express");

const PORT = 3010;

//instance of app
const app = express();

//middleware : here we will set the CSP header
app.use((req, res, next) => {
  /**
   * "default-src 'self';" : all sources from my domain are allowed
   * "script-src 'self' : scripts from my domain are allowed
   * 'unsafe-inline' : inline scripts are allowed
   * http://unsecure.com : specific domain is allowed
   * nonce-<key> : executes scripts which have the nonce with correct key
   */
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com"
  );
  //passing flow to next execution
  next();
});

//static assets can be accessed directly from here
app.use(express.static("public"));

app.get("./", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
