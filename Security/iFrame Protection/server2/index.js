//Child window
const express = require("express");
const app = express();

app.use(express.static("public"));

app.use((req, res, next) => {
  // This header helps us set valid parents for my website
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");

  //Prevent Cookie theft
  res.cookie("sessionID", "1234", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  next();
});

app.get("/iframe-website1", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website1.html");
});

app.get("/iframe-website2", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website2.html");
});

const port = process.env.PORT || 5011;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
