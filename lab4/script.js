//----------------------------------MENU----------------------------------------------//
const carouselItems = document.querySelectorAll('.carousel-item, .carousel-item1');
const nextImg = document.getElementById("next");
const prevImg = document.getElementById("prev");

let currentIndex = 0;

// Function to show the current item and hide others
function showItem(index) {
    carouselItems.forEach((item, i) => {
        if (i === index) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Next button event listener
nextImg.addEventListener("onclick", () => {
    currentIndex++;
    if (currentIndex >= carouselItems.length) {
        currentIndex = 0;
    }
    showItem(currentIndex);
});

// Previous button event listener
prevImg.addEventListener("onclick", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = carouselItems.length - 1;
    }
    showItem(currentIndex);
});

// Initialize the carousel
showItem(currentIndex);


/////----------------------------------NOW HIRING-------------------//////

const form = document.getElementById('appForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const fullTimeCheck = document.getElementById('fullTime');
const partTimeCheck = document.getElementById('partTime');
const anyJobCheck = document.getElementById('anyJob');

// Phone number formatting
phoneInput.addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    
    if (e.target.value.length !== 12) {
        this.setCustomValidity('Phone number must be in 111-222-3333 format.');
    } else {
        this.setCustomValidity('');
    }
});

// Age validation
ageInput.addEventListener('input', function() {
    const age = parseInt(this.value);
    if (isNaN(age) || age < 18 || age > 100) {
        this.setCustomValidity('Please enter a valid age between 18 and 100.');
    } else {
        this.setCustomValidity('');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect and log form data
    const formData = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        phone: phoneInput.value,
        email: emailInput.value,
        fullTime: fullTimeCheck.checked,
        partTime: partTimeCheck.checked,
        anyJob: anyJobCheck.checked
    };
    
    console.log('Form Data:', formData);
});

// Add a reminder for phone number format
phoneInput.placeholder = "111-222-3333";

// Add placeholders for other fields
nameInput.placeholder = "Enter your full name";
ageInput.placeholder = "Enter your age";
emailInput.placeholder = "Enter your email address";