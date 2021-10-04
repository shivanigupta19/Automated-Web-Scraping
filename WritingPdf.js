// node WritingPdf.js --source=teams.json --dest=root

let pdf = require('pdf-lib');
let fs = require('fs');
let parser = require('minimist');
let args = parser(process.argv);
let path = require('path');
let teamsJSON = fs.readFileSync(args.source , "utf-8");

let teams = JSON.parse(teamsJSON);
fs.mkdirSync(args.dest);
for(let i = 0 ; i < teams.length ; i++){
    let teamsFolder = path.join(args.dest , teams[i].name);
    fs.mkdirSync(teamsFolder);
    for(let j = 0 ; j  < teams[i].matches.length ; j++){
        let matchFileName = path.join(teamsFolder , teams[i].matches[j].vs + ".pdf");
        createScoreCard(teams[i].name , teams[i].matches[j] , matchFileName);
    }
}

function createScoreCard(teamName , match , matchFileName){
    // this function will create pdf for match in appropriate folder with correct details
    let result = teamName + " " + match.result;
    let pdfDocument = pdf.PDFDocument;
    let originalBytes = fs.readFileSync("template.pdf");
    let promiseToLoadBytes = pdfDocument.load(originalBytes);
    promiseToLoadBytes.then(function(pdfDoc){
        let page = pdfDoc.getPage(0);
        page.drawText(teamName , {
            x : 350,
            y : 605,
            size : 8
        }),
        page.drawText(match.vs , {
            x : 350,
            y : 590,
            size : 8
        }),
        page.drawText(result , {
            x : 350,
            y : 575,
            size : 8
        });
        let promiseToSave = pdfDoc.save();
        promiseToSave.then(function(newBytes){
            fs.writeFileSync(matchFileName , newBytes);
        });
    });

}
