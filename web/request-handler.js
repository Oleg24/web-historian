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
  if(req.method === "GET"){
    // check if req.url is in array returned by archive.readListOfUrls
    if(req.url === '/') {
      req.url = '/index.html';
        res.writeHead(200, httpHelper.headers);

        fs.readFile(archive.paths.siteAssets+req.url, options, function(error, contents){
          if(error) { throw error };
          console.log(contents);
          console.log('28');
          res.end(contents);
        })
    } else {
      archive.readListOfUrls(function(string){
        string.trim();
        var urlArray = string.split('\n');
console.log('30');
console.log(req.url)
      console.log(urlArray);
        if(urlArray && urlArray.indexOf(req.url.slice(1)) >= 0){
          res.writeHead(200, httpHelper.headers);

          fs.readFile(archive.paths.archivedSites+req.url, options, function(error, contents){
            if(error) { throw error };
            console.log(contents);
            console.log('28');
            res.end(contents);
          })
        } else {
          res.writeHead(404, httpHelper.headers);
          // res.redirect(archive.paths.siteAssets+"/loading.html");
          res.end();
        }
      });
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

