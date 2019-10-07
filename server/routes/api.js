    var express = require('express'),
    router = express.Router();

    router.use("/parser", require("../controllers/parser.api"));

    module.exports = router;
