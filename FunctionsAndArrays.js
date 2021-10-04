// Functions
let args = process.argv;
let n = parseInt(args[2]);

for(let i = 2 ; i <= n ; i++){
    let isPrime = IsPrime(i);
    if(isPrime == true) console.log(i);
}

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
// Arrays
let args = process.argv;
let n = parseInt(args[2]);
let arr = [];

for(let i = 0 ; i < n ; i++){
    arr.push(i);
}

for(let i = 0 ; i < n ; i++){
    console.log(arr[i]);
}
