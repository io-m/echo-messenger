const passport = require("passport");

module.exports = (app) => {
  // Passport is handling our endpoint and asks google for credentials
  // of user
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Google sends back access token (jwt). We need to extract it
  // and save it in DB
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logOut(); // method that comes with passport -> wipes the cookie
    res.redirect("/");
  });

  app.get("/api/current-user", (req, res, next) => {
    res.send(req.user); // req.user is set with passport.deserializeUser method
  });
};
