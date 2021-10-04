// node CreateBigFile.js --dest=big.data

let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');

let arr = [];
for(let i = 0 ; i < 50000 ; i++){
    arr.push(i);
}

let str = arr.join(" , ");
fs.writeFileSync(args.dest , str , "utf-8");
fs.appendFileSync(args.dest , str , "utf-8");
fs.appendFileSync(args.dest , str , "utf-8");
fs.appendFileSync(args.dest , str , "utf-8");
fs.appendFileSync(args.dest , str , "utf-8");
fs.appendFileSync(args.dest , str , "utf-8");
