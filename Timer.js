// node Timer.js --n=10 --d=500

let minimist = require('minimist');
let args = minimist(process.argv);
let count = args.n;

let id = setInterval(function(){
    console.log(count + " time-units to go.");
    count--;
    if(count == 0){
        console.log("Timeout.");
        clearInterval(id);
    }
} , args.d);