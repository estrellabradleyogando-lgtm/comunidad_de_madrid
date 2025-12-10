// hamburger menu and overlay functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    // Function to open menu
    function openMenu() {
        hamburger.classList.add('active');
        nav.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    }

    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            if (hamburger.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', function () {
            closeMenu();
        });
    }

    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu when pressing escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Basic function to scroll to sections
    function scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Hamburger Menu Toggle (guard for pages without navbar)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    function setMenuState(isOpen) {
        hamburger.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        // Accessibility/escape behavior
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    }

    hamburger.addEventListener('click', () => {
        const willOpen = !navMenu.classList.contains('active');
        setMenuState(willOpen);
    });

    // Keyboard support: Enter/Space toggles; Escape closes
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const willOpen = !navMenu.classList.contains('active');
            setMenuState(willOpen);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            setMenuState(false);
        }
    });
}


// Data for 12 months (Enero to Diciembre)
const labels = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Extended data for 12 months (replace with your actual 2025 data if available)
const chartDataValues = [65, 59, 80, 81, 56, 55, 40, 70, 75, 62, 58, 45]; // Example 12-month data

const data = {
    labels: labels,
    datasets: [{
        label: 'CO2 emitido por coches en 2025 (toneladas)',
        data: chartDataValues,
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // Enero
            'rgba(255, 159, 64, 0.6)', // Febrero
            'rgba(255, 205, 86, 0.6)', // Marzo
            'rgba(75, 192, 192, 0.6)', // Abril
            'rgba(54, 162, 235, 0.6)', // Mayo
            'rgba(153, 102, 255, 0.6)', // Junio
            'rgba(201, 203, 207, 0.6)', // Julio
            'rgba(255, 99, 132, 0.4)', // Agosto
            'rgba(255, 159, 64, 0.4)', // Septiembre
            'rgba(255, 205, 86, 0.4)', // Octubre
            'rgba(75, 192, 192, 0.4)', // Noviembre
            'rgba(54, 162, 235, 0.4)'  // Diciembre
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true, // Makes the chart resize with the container
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CO2 (toneladas)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Mes'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Emisiones de CO2 de coches por mes en 2025' // Main Chart Title
            }
        }
    },
};

// Find the canvas element and initialize the chart
window.onload = function() {
    const ctx = document.getElementById('co2Chart').getContext('2d');
    new Chart(
        ctx,
        config
    );
};

// --- ADDED: Card Carousel Logic ---

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('cardCarouselTrack');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const viewport = document.querySelector('.carousel-viewport');
    
    if (!track || !leftArrow || !rightArrow || !viewport) return; 

    const cards = track.querySelectorAll('.articulo-card');
    const cardsPerView = 3; 
    const totalCards = cards.length;
    let currentIndex = 0;

    // Get calculated height of a card including margin
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardMarginBottom = parseInt(cardStyle.marginBottom);
    const cardHeight = cards[0].offsetHeight + cardMarginBottom;
    
    // Set viewport height to show exactly 3 cards minus the last margin
    viewport.style.height = `${cardHeight * cardsPerView - cardMarginBottom}px`; 


    function updateCarousel() {
        // Calculate the translation distance
        const offset = -currentIndex * cardHeight;
        track.style.transform = `translateY(${offset}px)`;
        
        // Update arrow visibility
        leftArrow.disabled = currentIndex === 0;
        rightArrow.disabled = currentIndex >= totalCards - cardsPerView;
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < totalCards - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initial setup
    updateCarousel();
});