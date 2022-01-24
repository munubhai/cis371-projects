// You don't NEED a class in TS

class Demo {

    // Don't need the function keyword inside a class
    // Also type comes after the method/variable name

    sayHello(): void {
        console.log("hello world");
    }
}

// Creating new demo
const d:Demo = new Demo();
d.sayHello();

// Use function keyword if outside of class
function helloAgain(): void {
    console.log("hello again");
}

helloAgain();

// let and const
// Use const if you aren't changing the value
// let otherwise, NEVER use var
// explicit type not necessarily required as well
let distance: number;
const month = "July";

// null and undefined are different

// Variables can have multiple types
let a: number | boolean;
let b: string | number | null = 6.5;

// a = "can't do this"
a = false;
console.log(typeof b); // Output: number
b = "hello";
console.log(typeof b); // Output: string