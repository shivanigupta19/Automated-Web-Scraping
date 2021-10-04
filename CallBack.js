// node CallBack.js --source=f1.txt --n=100
// without call back

let parser = require('minimist');
let fs = require('fs');
let args = parser(process.argv);
let t1 = Date.now();
let stext = fs.readFileSync(args.source , "utf-8");
let t2 = Date.now();

console.log((t2 - t1) % 100000);

let t3 = Date.now();
let arr = [];
for(let i = 2 ; i < args.n ; i++){
    let isPrime = IsPrime(i);
    if(isPrime == true) arr.push(i);
}

let t4 = Date.now();
console.log((t4 - t3) % 100000);

function IsPrime(x){
    let isPrime = true;
    for(let i = 2 ; i * i <= x ; i++){
        if(x % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}
// Callback

let t5 = Date.now();
fs.readFile(args.source , function(data){
    let t6 = Date.now();
    console.log("Finishing task 1 " + t6 % 100000);
    console.log((t6 - t5) % 100000);
})
let t7 = Date.now();
let arr1 = [];
for(let i = 2 ; i < args.n ; i++){
    let isPrime = IsPrime(i);
    if(isPrime == true) arr1.push(i);
}

let t8 = Date.now();
console.log((t8 - t7) % 100000);

function IsPrime(x){
    let isPrime = true;
    for(let i = 2 ; i * i <= x ; i++){
        if(x % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}
