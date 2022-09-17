scene = require(`${process.cwd()}/module/main.js`)
console.log(`${process.cwd()}/module/main.js`);
module.exports = (req,res)=> {
    res.json(200,scene())
};