    var express = require("express"),
    router = express.Router();
    const Parser = require("../models/Parser.js");

    router.get("/", function(req, res) {
      const p = new Parser();
      p.getHtml( (data) => {
        res.status(200).json({status:"ok",data:data });
      });
      res.status(500);

    }).post("/", function(req, res) {
      const p = new Parser();
      const objIn = req.body;
      const v = p.validate( objIn );
      if(!v){
        res.status(200).json({status:"err",data:"wrong input data" });
      }
      const out =  p.parseHtml( objIn );
      p.saveStrToFile(out, () => {
        res.status(200).json({status:"ok" });
      });
      res.status(500);
    });

    module.exports = router;
