const express = require("express");
const router = express.Router();
const thirdParty = require("./thirdParty");
const user = require("./user");

router.use("/thirdParty", thirdParty);

router.use("/user", user);

module.exports = router;