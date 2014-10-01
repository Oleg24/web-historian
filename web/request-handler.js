var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('request');
var express = require('express')
var fs = require('fs');
// require more modules/folders here!
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': 'application/json'
};
var options = {
  encoding: 'utf8'
}

exports.handleRequest = function (req, res) {
  console.log('test');
  if(req.method === "GET"){
    if(req.url === '/'){
      res.writeHead(200, headers);

      fs.readFile(archive.paths.siteAssets+'/index.html', options, function(error, contents){
        if(error) { throw error };
        res.end(contents);
      })
    } else if(req.url === "/www.google.com"){
        res.writeHead(200, headers);

        fs.readFile(archive.paths.archivedSites+"/www.google.com", options, function(error, contents){
          if(error) { throw error }
          res.end(contents);
        })
    }
    console.log("req method is "+req.method);
  }
  if(req.method === "POST"){
    //fs.writeFile(archive.paths.list, function)
  }
};

