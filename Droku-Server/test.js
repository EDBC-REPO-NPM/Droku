
const fetch = require('molly-fetch');
const {Buffer} = require('buffer');

//https://proxyscrape.com/free-proxy-list

fetch('https://arepatv.ml',{
    headers: {
        'Referer': 'https://player.pelisgratishd.io',
        'authority': 'player.pelisgratishd.io',
    },  responseType: 'stream',
})
.then((res)=>{ 
    console.log(res.req.url);
})
.catch((rej)=>{
});