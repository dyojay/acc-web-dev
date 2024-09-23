//alert("Connected")
let food = document.getElementById("fruit");
console.log(food);
food.style.color="Red";
food.style.border="cyan ridge 2px ";

let food2 = document.getElementsByClassName("breakfast");
console.log(food2[0]);

let food3 = document.getElementsByTagName("li");
console.log(food3[2]);
console.log(food3[1].textContent);
food3[1].textContent="Sold Out!!"

let food4 =document.querySelector("#fruit");
console.log(food4);

let food5 = document.querySelectorAll("h1")
console.log(food5[1]);

let ul = document.querySelector("ul")
console.log("ul");

let li = document.querySelector("li")
li.innerHTML = "Chocolate <b>Yum!!!!!!!!</b>";

document.querySelector("a").getAttribute("href");

document.querySelector("a").getAttribute("href", "http://amazon.com");

let input = document.getElementsByTagName("input");
// input[0].setAttribute("type", "password");
console.log(input[0].value);


let submitButton = document.querySelector('button[type="submit"]')
submitButton.addEventListener("click", (event) =>{
    event.preventDefault()

    // let fname=input[0].value
    // let lname=input[1].value
    // let age=input[2].value
    // let person = {
    //     fname,
    //     lname,
    //     age
    // }

    // console.log(fname + " " + lname + " " + age);
    let person = {
        fname: input[0].value,
        lname: input[1].value,
        age: Number(input[2].value
        )}
        let strPerson = JSON.stringify(person)
        console.log(strPerson);
           input[0].value = "";
           input[1].value = "";
           input[2].value = "";
        }); 