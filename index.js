const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const { use } = require("passport");
require("./models/User");
require("./services/passport");

// Establishing connection to mongoDB via Mongoose
mongoose.connect(keys.mongoConnString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Creating app instance of express
const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
    keys: [keys.cookieKey],
  })
);

// passport is using cookie as a medium to transfer user.ID in serialize method,
// and deserialize it bact to mongo DB as a check for authentication
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hi");
});

// function from authRoutes dir. There, we define all routes,
// but here we just execute them
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// This part is for HEROKU to resolve static files generated by npm run build
// so React can generate static files such as .js and .css
// It is only for production level mode, because in dev. mode
// we have create-react-app 'separate' server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("echo-messenger-client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "echo-messenger-client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5500;
app.listen(PORT);
