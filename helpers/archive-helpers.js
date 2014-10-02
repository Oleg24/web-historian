var fs = require('fs');
var path = require('path');
var _ = require('underscore');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

var options = {
  encoding: 'utf8'
}

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var urlList;
  fs.readFile(exports.paths.list, options, function(error, data){
    if( error ) throw error;
    console.log(data)
    console.log('in helpers')
    callback(data);
  });
};

exports.isUrlInList = function(list, url){
  // read list of urls
  // check if target url is in the array of urls
  _.contains(list , url);

};

exports.addUrlToList = function(list, url){
  list.push(url);
  fs.appendFile(exports.paths.list, url);
  console.log(list);
};

exports.isURLArchived = function(list, url){
  // do we have the source code?
  // if no... make the web workers get the source code

};

exports.downloadUrls = function(list){

};
