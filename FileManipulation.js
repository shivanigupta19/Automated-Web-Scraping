let parser = require('minimist');
let args = parser(process.argv);
let fs = require('fs');

// let name = args.name;
// let age = args.age;

// if(age > 20) console.log(name + " is greater than 20 and her age is " + age);
// else console.log(name + " is smaller than 20 and her age is " + age);

let stext = fs.readFileSync(args.source , "utf-8");
// let words = stext.split(" ");
// console.log(words);

// for(let i = 0 ; i < words.length ; i++){
//     words[i] = words[i].toUpperCase();
// }

// let dtext = words.join(" ");
let dtext = stext.toUpperCase();
fs.writeFileSync(args.dest , dtext , "utf-8");




