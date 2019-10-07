    var express = require('express'),
     //path = require('path'),
     bodyParser = require('body-parser'),
     routes = require('./server/routes/web'),
     apiRoutes = require('./server/routes/api');

    //require("./server/config/db");

    var app = express();

    app.use(bodyParser.json());


    //app.use(bodyParser.urlencoded({ extended: false }));
		// Allow requests from Angular
		app.use((req, res, next) => {
  		// Website you wish to allow to connect
  		//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  		// Request methods you wish to allow
  		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  		// Request headers you wish to allow
  		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');



  		// Pass to next layer of middleware
  		next();
	  });

    //app.use(express.static(path.join(__dirname, 'app')));
    //app.use(express.static(path.join(__dirname, 'app/src')));
    //app.use(express.static(path.join(__dirname, 'node_modules' ) ));

    //app.use('/', routes);
    app.use('/api', apiRoutes);

    var port = 3000;

    app.listen(port, function() {
		console.log("Server is running at : http://localhost:" + port);
    });
