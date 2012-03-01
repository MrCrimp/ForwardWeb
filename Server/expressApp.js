// *******************************************************
// expressjs template
//
// assumes: npm install express
// defaults to jade engine, install others as needed
//
// assumes these subfolders:
//   public/
//   public/javascripts/
//   public/stylesheets/
//   views/
//

//DB => 

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express.createServer();
var viewEngine = 'jade'; 
var cloudDb = 'mongodb://joholo:n0demo@staff.mongohq.com:10056/CloudNode';
// Configuration
mongoose.connect(cloudDb);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', viewEngine);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
// *******************************************************


app.get('/', function(req, res){
  res.send('Hello Root');
});

app.get('/todo', function(req, res){
  res.render('todo', {title: "slash todo yo"});
});

app.listen(process.env.C9_PORT);
