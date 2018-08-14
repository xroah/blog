const express = require("express");
const router = express.Router();
const thirdParty = require("./public/thirdParty");
const user = require("./public/user");
const admin = require("./admin");

router.use("/thirdParty", thirdParty);
router.use("/user", user);

router.use("/admin", admin)

module.exports = router;