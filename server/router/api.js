const express = require("express");
const router = express.Router();
const thirdParty = require("./thirdParty");

router.use("/thirdParty", thirdParty);

module.exports = router;