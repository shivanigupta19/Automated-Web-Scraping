// node ReadingJson.js --source=teams.json
let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');

fs.readFile(args.source , "utf-8" , function(err , res){
    if(err) console.log(err);
    else {
        let teams = JSON.parse(res); // JSON to JSO
        console.log(teams[2].matches[0].vs);
    }
});
