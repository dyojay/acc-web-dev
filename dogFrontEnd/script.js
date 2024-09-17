//user clicks button
//consume api
//send bsck rando img to html
let img = document.getElementsByTagName("img")
img[0].setAttribute("src","https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg" );
img[0].style.width="300px"
img[0].style.height="300px"
img[0].style.display="block";
img[0].style.margin="0 auto";


let button = document.getElementsByTagName("button")
//assign a listener for a click button 
button[0].style.display="flex";
button[0].style.margin="20px auto"
button[0].addEventListener("click", () =>{
             //CONSUME API

    //1)endpoint- https://dog.ceo/api/breeds/image/random
    //2 json or xml- json
    //3 how much data- 1 obj 
    //4 what dataliiks like - 2 thiongs, message = potential img , sucess

            
    
    
    
                    //HTTP REQUEST 
                    //WHERE YOU SEE FETCH ,, THAT IS THE BEGINNING OF THE FETCH FUNC 

    const baseURL = "https://dog.ceo/api/breeds" //the base URL has it set so you dont have to retype within func
    let route ="image/random"
    let endpoint=`${baseURL}/${route}`
    //1 Utilize the endpoint w/ correct method (verb)
    fetch(endpoint)
    //2 Get a response: if ok, parse data , else error
    .then((response) => {
        console.log(response);
        if(response.ok){
            return response.json();
        } else{
            throw Error("Error!!!!!!!!");
        }
    })
    //3 Do something with parsed data
    .then((data)=>{
        img[0].setAttribute("src", data.message)
        // img[0].style.width= "300px";      
        // img[0].style.height= "300px";
        console.log("Data: ", data);
        
    })
    //4 Handle the error
    .catch((error) =>{
        console.log(error);

    });
});
