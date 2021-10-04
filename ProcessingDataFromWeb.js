// node ProcessingDataFromWeb.js --source="download.html"

let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');
let jsdom = require('jsdom');

fs.readFile(args.source , "utf-8" , function(err , data){
    let JSDOM = jsdom.JSDOM;
    let dom = new JSDOM(data);
    let document = dom.window.document;
    // DOM will load html and prepare the dom for programmer just like browser would have

    // let b2 = document.querySelectorAll("button");
    // console.log(b2);

    let descs = document.querySelectorAll("div.match-info > div.description");
    // we will get all div's with class description whose parent is a div class match-info
    for(let i = 0 ; i < descs.length ; i++) console.log(descs[i].textContent);
    
})

