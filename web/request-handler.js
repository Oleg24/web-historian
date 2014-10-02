var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('request');
var express = require('express')
var fs = require('fs');
var httpHelper = require("./http-helpers.js")
// require more modules/folders here!

var options = {
  encoding: 'utf8'
}

exports.handleRequest = function (req, res) {
  console.log('line20 '+req.url);
  if(req.method === "GET"){
    // check if req.url is in array returned by archive.readListOfUrls
    var urlList;
    archive.readListOfUrls(function(string){
      string.trim();
      urlList = string.split('\n');
    });

    if(urlArray && urlArray.indexOf(req.url) >= 0){
      res.writeHead(200, httpHelper.headers);

      fs.readFile(archive.paths.siteAssets+req.url, options, function(error, contents){
        if(error) { throw error };
        res.end(contents);
      })
    } else {
      res.writeHead(404, httpHelper.headers);
      // res.redirect(archive.paths.siteAssets+"/loading.html");
      res.end();
    }

  }
  if(req.method === "POST"){
    req.on('data', function(site){
      var site = site.substring(4);
      fs.appendFile(archive.paths.list, site+'\n', function(error){
        if(error) { throw error };
      })
    res.writeHead(302,
      { Location: archive.paths.siteAssets+"/loading.html"}
      );
    res.end()
    })
  }
};

