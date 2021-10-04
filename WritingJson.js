// node WritingJson.js --dest=teams.json
let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');
let jsdom = require('jsdom');

let arr = [
    {
        name : 'India',
        rank : 1,
        matches : [
            {
                vs : 'Australia',
                result : 'Win'
            },
            {
                vs : 'England',
                result : 'Win'
            }
        ]
    },
    {
        name : 'Australia',
        rank : 2,
        matches : [
            {
                vs : 'India',
                result : 'Loss'
            },
            {
                vs : 'England',
                result : 'Win'
            }
        ]
    },
    {
        name : 'England',
        rank : 3,
        matches : [
            {
                vs : 'Australia',
                result : 'Loss'
            },
            {
                vs : 'India',
                result : 'Loss'
            }
        ]
    }
];
let json = JSON.stringify(arr);
fs.writeFileSync(args.dest , json , "utf-8" , function(err , res){
    if(err) console.log(err);
    else console.log(res);
});