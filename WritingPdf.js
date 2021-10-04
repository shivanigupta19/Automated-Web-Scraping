// node WritingPdf.js --source=teams.json --dest=root

let pdf = require('pdf-lib');
let fs = require('fs');
let teamsJSON = fs.readFileSync(args.source , "utf-8");

let teams = JSON.parse(teamsJSON);
fs.mkdirSync(args.dest);
for(let i = 0 ; i < teams.length ; i++){
    let teamsFolder = path.join(args.dest , teams[i].name);
    fs.mkdirSync(teamsFolder);
    for(let j = 0 ; j  < teams[i].matches.length ; j++){
        let matchFileName = path.join(teamsFolder , team[i].matches[j].vs + ".pdf");

        // fs.writeFileSync(fileName , " ", "utf-8");
        createScoreCard(teams[i].name , teams[i].matches[j] , matchFileName);
    }
}

function createScoreCard(teamName , match , matchFileName){

}
