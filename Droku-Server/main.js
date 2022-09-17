const fs = require('fs');
const url = require('url');
const http = require('http');
const fetch = require('axios');
const molly = require('molly-js');

//------------------------------------------------------------------------------------//

process.molly.threads = 1;
process.molly.debbug = true;
process.molly.chunkSize = Math.pow(10,6) * 3;

//------------------------------------------------------------------------------------//

molly.createHTTPServer((server)=>{},3000);
