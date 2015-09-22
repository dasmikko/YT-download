// Load native UI library.
var gui = require('nw.gui');
var forEachAsync = require('forEachAsync').forEachAsync;
var path = require('path');
var fs = require('fs');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var cheerio = require('cheerio');
var sanitize = require("sanitize-filename");
