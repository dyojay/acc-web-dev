const imgArray= ["1.jpg","2.jpg", "3.jpg"];
const nextBtn =document.getElementById("next");
const prevBtn= document.getElementById("prev");

let counter = 0;
nextBtn.addEventListener("click",()=>{
    counter++;
    if(counter >= imageArray.length){
        counter = 0;
    }
    let path =`.assets/${imgArray[counter]}`;
    img[0].src.path
});

prevBtn.addEventListener("click",()=>{
    counter--;
    if(counter <= imgArray.length){
        counter = 0;
    }
    let path =`.assets/${imgArray[counter]}`
});