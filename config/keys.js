if (process.env.NODE_ENV === "production") {
  // This is production mode and we return poduction set of keys on heroku.com
  module.exports = require("./production");
} else {
  // This is development set -> on local computer, so export keys (googleID, google client secret et...) from dev.js
  module.exports = require("./dev");
}
