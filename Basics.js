let args = process.argv;
console.log(args);

let i = args[2];
console.log(i);

let j = parseInt(args[2] , 10);
console.log(j);

let arg = process.argv;
let n = parseInt(arg[2]);

for(let i = 1 ; i <= n ; i++){
    let line = "";
    for(let j = 1 ; j <= i ; j++){
        line = line + "*\t";
    }
    console.log(line);
}

