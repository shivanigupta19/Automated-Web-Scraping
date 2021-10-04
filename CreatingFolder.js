// node CreatingFolder.js --source=teams.json --dest=root

let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');
let excel = require('excel4node');
let path = require('path');

let teamsJSON = fs.readFileSync(args.source);
let teams = JSON.parse(teamsJSON);
for(let i = 0 ; i < teams.length ; i++){
    // fs.mkdirSync(args.dest + "/" + teams[i].name);
    let folderName = path.join(args.dest , teams[i].name);
    fs.mkdirSync(folderName);
}

