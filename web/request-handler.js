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
  console.log('line20 '+req.url);
  if(req.method === "GET"){
    // check if req.url is in array returned by archive.readListOfUrls
    var urlList;
    archive.readListOfUrls(function(string){
      console.log('25'+ string)
      string.trim();
      urlList = string.split('\n');
      console.log(urlList)

    });
    console.log('line 27 ' +urlList)
    // console.log("array below?")
    // console.log(urlArray);
    if(urlArray && urlArray.indexOf(req.url) >= 0){
      res.writeHead(200, headers);

      fs.readFile(archive.paths.siteAssets+req.url, options, function(error, contents){
        if(error) { throw error };
        res.end(contents);
      })
    } else {
      res.writeHead(404, headers);
      // res.redirect(archive.paths.siteAssets+"/loading.html");
      res.end();
    }

    console.log("req method is "+req.method);
  }
  if(req.method === "POST"){
    req.on('data', function(site){
      var site = site.substring(4);
      console.log("archives"+ archive.paths.list)
      fs.appendFile(archive.paths.list, site+'\n', function(error){
        if(error) { throw error };
        console.log('line43 '+site)
      })
    res.writeHead(302,
      { Location: archive.paths.siteAssets+"/loading.html"}
      );
    res.end()
    })
  }
};

