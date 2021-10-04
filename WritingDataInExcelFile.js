// node WritingDataInExcelFile.js --source=teams.json --dest=teams.csv
let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');
let excel = require('excel4node'); // Read JSON file and put data in excel file

let teamsJSON = fs.readFileSync(args.source , "utf-8");
let teams = JSON.parse(teamsJSON);
let wb = new excel.Workbook();

let style = wb.createStyle({
    font : {
        color : "#FF0800",
        size : 12
    }
});

for(let i = 0 ;  i < teams.length ; i++){
    let sheet = wb.addWorksheet(teams[i].name);
    sheet.cell(1 , 1).string("Opponent").style;
    sheet.cell(1 , 2).string("Result").style;
    sheet.cell(1 , 4).string("Rank").style;
    sheet.cell(1 , 5).number(teams[i].rank);
    for(let j = 0 ; j < teams[i].matches.length ; j++){
        let vs = teams[i].matches[j].vs;
        let result = teams[i].matches[j].result;
        sheet.cell(2 + j , 1).string(vs);
        sheet.cell(2 + j , 2).string(result);
    }
}
wb.write(args.dest);