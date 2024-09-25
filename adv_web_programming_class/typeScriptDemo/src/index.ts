// here is an arrays strings

let dogArray: String[] = ["tobi","django","kobe"];
//array of numbers
let numArray: number[] = [14,23,44];

// data sctructure with no declare data type = any
let movieArr: object[]=[]; //



//function
//data typrs for params and args
//data types for returned values
// data type is to be reutnred is set at the end of the func
const getAge = (num:number, fname: String= "DY", isMarried:boolean =false): number => {
    return num *4;
};

let result = getAge(32);
console.log(result);
