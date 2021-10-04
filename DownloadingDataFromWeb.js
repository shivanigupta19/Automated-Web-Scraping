let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');
let axios = require('axios'); // It will download url

// node DownloadingDataFromWeb --url="https://www.espncricinfo.com/live-cricket-match-results" --dest="download.html"

let dldPromise = axios.get(args.url);
dldPromise.then(function(res){
    let html = res.data;
    fs.writeFileSync(args.dest , html , "utf-8");
}).catch(function(err){
    console.log(err);
});