document.addEventListener('DOMContentLoaded', function() {
    // Menu Items
    const menuItems = [
        {
            image: "assets/Barbacoa-Tacos-3.webp",
            name: "Barbacoa Tacos",
            description: "Tender, slow-cooked beef in warm tortillas",
            price: 12.99
        },
        {
            image: "assets/birria-tacos-FT-RECIPE0420-1-b209e88cc1c04b72849634ff15214290.jpg",
            name: "Birria Tacos",
            description: "Juicy, flavorful beef tacos served with consomé",
            price: 13.99
        },
        {
            image: "assets/Taco-salad-recipe.jpg",
            name: "Taco Salad",
            description: "Crispy shell filled with seasoned ground beef and fresh veggies",
            price: 10.99
        }
    ];

    let currentIndex = 0;

    function updateMenuDisplay() {
        const item = menuItems[currentIndex];
        document.getElementById('menu-image').src = item.image;
        document.getElementById('menu-image').alt = item.name;
        document.getElementById('menu-item').textContent = item.name;
        document.getElementById('menu-description').textContent = item.description;
        document.getElementById('menu-price').textContent = `$${item.price.toFixed(2)}`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % menuItems.length;
        updateMenuDisplay();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        updateMenuDisplay();
    }

    document.getElementById("next-btn").addEventListener("click", nextImage);
    document.getElementById("prev-btn").addEventListener("click", prevImage);

    // Initial display
    updateMenuDisplay();
});
    
// ---------------------------------------------------------------
    // Form Handling
    const form = document.getElementById('appForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                hireName: document.getElementById('hireName').value,
                age: parseInt(document.getElementById('age').value),
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                fullTime: document.getElementById('fullTime').checked,
                partTime: document.getElementById('partTime').checked,
                aJob: document.getElementById('aJob').checked
            };
            console.log('Form Data:', formData);
        });

        // Phone number formatting
        document.getElementById('phone').addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });

        // Age validation
        document.getElementById('age').addEventListener('input', function() {
            const age = parseInt(this.value);
            this.setCustomValidity((isNaN(age) || age < 18 || age > 100) ? 'Please enter a valid age between 18 and 100.' : '');
        });
};

    