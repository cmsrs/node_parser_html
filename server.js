    var express = require('express'),
     bodyParser = require('body-parser'),
     routes = require('./server/routes/web'),
     apiRoutes = require('./server/routes/api');

    var app = express();

    app.use(bodyParser.json());

		app.use((req, res, next) => {
  		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  		// Pass to next layer of middleware
  		next();
	  });

    var swaggerUi = require('swagger-ui-express'),
        swaggerDocument = require('./swagger.json');

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    app.use('/', routes);
    app.use('/api', apiRoutes);

    var port = 3000;

    app.listen(port, function() {
		    console.log("Server is running at : http://localhost:" + port);
    });
