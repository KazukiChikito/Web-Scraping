// Imports
// rp to make a get request and return a promise
const rp = require('request-promise');
// cheerio to parse the promise from json to text
const cheerio = require('cheerio');
// Table to display data as a table, duh
const Table = require('cli-table');

let users = [];
let 