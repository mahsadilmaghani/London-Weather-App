var http = require('http');
var express = require('express');
var sass = require('node-sass');
var app = express()

app.use('/stylesheets', express.static('stylesheets'));

var url = 'https://www.metaweather.com/api/location/44418/';

var server = http.createServer(function(request, response) {
  var request = require('request');
  request(url, function(err, res, body){
    var data = JSON.parse(body);

    response.write("<html><body><div id='container'>");
    response.write("<h1>"+ 'Weather Now in ' + data['title'] + '<br>' + "</h1>");
    response.write("<h2>"+ 'Weather State : ' + ' ' + data.consolidated_weather[0].weather_state_name + '<br>' + "</h2>");
    //response.write("<h2>"+ 'Created : ' + data['time'] + '<br>' + "</h2>");
    response.write("<h2>"+ 'Min Temprature : ' + Math.round(data.consolidated_weather[0].min_temp) + '&#8451;' + '<br>' + "</h2>");
    response.write("<h2>"+ 'Max Temprature : ' + Math.round(data.consolidated_weather[0].max_temp) + '&#8451;' + '<br>' + "</h2>");
    response.write("<h2>"+ 'Humidity : ' + data.consolidated_weather[0].humidity + '<br>' + "</h2>");
    response.write("</div></body></html>");
    console.log(data);
    response.end();
});

}).listen(3000);
