import {Person} from "./helper"

let people: Person[] = [
    {
        fname: "George",
        lname: "of the jungle",
        isMarried: true,
        children: [],
        getFullName: function () {
            return `${this.fname} ${this.lname}`           
        },
        getAge: function(doggy,horse) {
        return doggy  * 10;       
        }
    }
]

console.log(people[0].getFullName());
console.log(people[0].getAge);
