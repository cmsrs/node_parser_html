    var express = require('express'),
    router = express.Router(),
    path = require("path");
     
    var absPath = path.join(__dirname, "../../app/src");
	//console.log( absPath + "index.html"  );
    router.get('/', function(req, res, next) {
		res.sendFile(absPath + "/index.html");
		//res.sendFile(absPath + "index.html");
    });

    module.exports = router;
