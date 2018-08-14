const router = require("express").Router();

router.get("/list", (req, res) => {
   res.send("list"); 
});

module.exports = router;