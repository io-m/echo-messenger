const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

// Establishing connection to mongoDB via Mongoose
mongoose.connect(keys.mongoConnString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Creating app instance of express
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
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
authRoutes(app);

const PORT = process.env.PORT || 5500;
app.listen(PORT);
