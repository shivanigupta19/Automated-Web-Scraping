// node CricInfoScraping.js --dest2=root --file=teams.json --dest=teams.csv --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results 
let minimist = require('minimist');
let args = minimist(process.argv);
let fs = require('fs');
let pdf = require('pdf-lib');
let excel = require('excel4node');
let axios = require("axios");
let jsdom = require('jsdom');
let path = require('path');


// Read data from CricInfo World Cup 2019 (axios)
// Process data : Get all the teams (jsdom)
// Write processed data in Excel : Match result per team in their own sheet (excel4node)
// Create folder of each team (fs)
// Write pdf file for each scorecard of each match in relevant folder (pdf-lib)

axios.get(args.source).then(function(res){
    let html = res.data;
    let dom = new jsdom.JSDOM(html);
    let doc = dom.window.document;
    let data = doc.querySelectorAll("div.match-score-block");
    let matches = [];
    for(let i = 0 ; i < data.length; i++){
        let match = {};
        let teams = data[i].querySelectorAll("div.name-detail > p.name");

        match.t1 = teams[0].textContent;
        match.t2 = teams[1].textContent;

        let scores = data[i].querySelectorAll("div.score-detail > span.score");
        if(scores.length == 2){
            match.t1s = scores[0].textContent;
            match.t2s = scores[1].textContent;
        }else if(scores.length == 1){
            match.t1s = scores[0].textContent;
            match.t2s = "";
        }else {
            match.t1s = "";
            match.t2s = "";
        }
        let result = data[i].querySelector("div.status-text");
        match.result = result.textContent
        matches.push(match);
    }
    let teams = [];
    for(let i = 0 ; i < matches.length ; i++){
        populateTeams(teams , matches[i]);
    }
    for(let i = 0 ; i < matches.length ; i++){
        loadMatchesInArray(teams , matches[i]);
    }
    let teamsJson = JSON.stringify(teams);
    fs.writeFileSync(args.file , teamsJson , "utf-8");
    // let readingTeamsJSON = fs.readFileSync(args.file,"utf-8");
    // let teamsJSO = JSON.parse(readingTeamsJSON);
    // for(let i = 0 ; i < teams.length ; i++) console.log(teams[i]);
    createExcelSheet(teams);
    makeFolder(teams);
    makePdf(teams);
});
function createExcelSheet(teams){
    let wb = new excel.Workbook();
    for(let i = 0 ;  i < teams.length ; i++){
        let sheet = wb.addWorksheet(teams[i].name);
        sheet.cell(1 , 1).string("Vs").style;
        sheet.cell(1 , 2).string("Self Score").style;
        sheet.cell(1 , 3).string("Opp Score").style;
        sheet.cell(1 , 4).string("Result").style;
        for(let j = 0 ; j < teams[i].matches.length ; j++){
            sheet.cell(3 + j , 1).string(teams[i].matches[j].vs);
            sheet.cell(3 + j , 2).string(teams[i].matches[j].selfScore);
            sheet.cell(3 + j , 3).string(teams[i].matches[j].oppScore);
            sheet.cell(3 + j , 4).string(teams[i].matches[j].result);
        }
    }
   wb.write(args.dest);
}
function makePdf(team){
    for(let i = 0 ; i < team.length ; i++){
        let teamFolder = path.join(args.dest2 , team[i].name);
        for(let j = 0 ; j < team[i].matches.length ; j++){
            let matchFileName = path.join(teamFolder , team[i].matches[j].vs + ".pdf");
            createScoreCard(team[i].name , team[i].matches[j] , matchFileName);
        }
    }
}
function createScoreCard(teamName , match , matchFileName){
    // this function will create pdf for match in appropriate folder with correct details
    let result = teamName + " " + match.result;
    let pdfDocument = pdf.PDFDocument;
    let originalBytes = fs.readFileSync("WORLD CUP 2019.pdf");
    let promiseToLoadBytes = pdfDocument.load(originalBytes);
    promiseToLoadBytes.then(function(pdfDoc){
        let page = pdfDoc.getPage(0);
        page.drawText(teamName , {
            x : 350,
            y : 645,
            size : 8
        }),
        page.drawText(match.vs , {
            x : 350,
            y : 630,
            size : 8
        }),
        page.drawText(match.selfScore.toString() , {
            x : 350,
            y : 615,
            size : 8
        }),
        page.drawText(match.oppScore.toString() , {
            x : 350,
            y : 600,
            size : 8
        }),
        page.drawText(result , {
            x : 350,
            y : 585,
            size : 8
        });
        let promiseToSave = pdfDoc.save();
        promiseToSave.then(function(newBytes){
            fs.writeFileSync(matchFileName , newBytes);
        });
    });
}
function makeFolder(teams){
    for(let i = 0 ; i < teams.length ; i++){
    let folderName = path.join(args.dest2 , teams[i].name);
    fs.mkdirSync(folderName);
    }
}
function loadMatchesInArray(teams , match){
    let idx1 = -1;
    for(let i = 0 ; i < teams.length ; i++){
        if(teams[i].name == match.t1){
            idx1 = i;
            break;
        }
    }
    let  team1 = teams[idx1];
    team1.matches.push(
        {
            vs : match.t2,
            selfScore : match.t1s,
            oppScore : match.t2s,
            result : match.result
        }
    );
    let idx2 = -1;
    for(let i = 0 ; i < teams.length ; i++){
        if(teams[i].name == match.t2){
            idx2 = i;
            break;
        }
    }
    let  team2 = teams[idx2];
    team2.matches.push(
        {
            vs : match.t1,
            selfScore : match.t2s,
            oppScore : match.t1s,
            result : match.result
        }
    );


}
function populateTeams(teams , match){
    let idx1 = -1;
    for(let i = 0 ; i < teams.length ; i++){
        if(teams[i].name == match.t1){
            idx1 = i;
            break;
        }
    }
    if(idx1 == -1){
        teams.push({
            name : match.t1,
            matches : []
        });
    }
    let idx2 = -1;
    for(let i = 0 ; i < teams.length ; i++){
        if(teams[i].name == match.t2){
            idx2 = i;
            break;
        }
    }
    if(idx2 == -1){
        teams.push({
            name : match.t2,
            matches : []
        });
    }
}



