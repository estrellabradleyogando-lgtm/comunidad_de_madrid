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


// Etiquetas para los últimos 10 años (2015-2025)
const etiquetas = [
    '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'
];

// Datos: CO2 emitido por año (mostrando reducción progresiva con variaciones)
const datos = {
    labels: etiquetas,
    datasets: [{
        label: 'CO₂ emitido (toneladas)',
        data: [100, 95, 88, 82, 75, 68, 63, 55, 49, 42, 35], // Valores decrecientes con variaciones irregulares
        backgroundColor: 'rgba(255, 0, 0, 0.5)', // Rojo semitransparente
        borderColor: 'rgb(255, 0, 0)',           // Rojo sólido
        borderWidth: 1
    }]
};

// Configuración del gráfico
const config = {
    type: 'bar',
    data: datos,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CO₂ emitido (toneladas)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Años'
                }
            }
        }
    }
};

// Renderizar el gráfico
window.onload = function() {
    const ctx = document.getElementById('Chart');
    if (ctx) {
        new Chart(ctx, config);
    }
};

// --- ADDED: Card Carousel Logic ---

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('cardCarouselTrack');
    const leftArrow = document.querySelector('.articulo-container .left-arrow');
    const rightArrow = document.querySelector('.articulo-container .right-arrow');
    const viewport = document.querySelector('.articulo-container .carousel-viewport');
    
    if (!track || !leftArrow || !rightArrow || !viewport) return; 

    const cards = track.querySelectorAll('.articulo-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    // Cards now have fixed height in CSS, no need to calculate
    function setEqualHeight() {
        // Fixed height is set in CSS, no dynamic calculation needed
        return;
    }
    
    // Calculate cards per view based on screen size
    function getCardsPerView() {
        if (cards.length === 0) return 1;
        const viewportWidth = viewport.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // gap between cards
        return Math.floor((viewportWidth + gap) / (cardWidth + gap)) || 1;
    }

    function updateCarousel() {
        if (cards.length === 0) return;
        
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        // Calculate the translation distance (horizontal)
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // gap between cards
        const offset = -currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
        
        // Update arrow visibility
        leftArrow.disabled = currentIndex === 0;
        rightArrow.disabled = currentIndex >= maxIndex;
        
        if (leftArrow.disabled) {
            leftArrow.style.opacity = '0.3';
            leftArrow.style.cursor = 'not-allowed';
        } else {
            leftArrow.style.opacity = '1';
            leftArrow.style.cursor = 'pointer';
        }
        
        if (rightArrow.disabled) {
            rightArrow.style.opacity = '0.3';
            rightArrow.style.cursor = 'not-allowed';
        } else {
            rightArrow.style.opacity = '1';
            rightArrow.style.cursor = 'pointer';
        }
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Set equal heights and initial setup
    setEqualHeight();
    updateCarousel();
    
    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setEqualHeight();
            // Reset index if current position is invalid after resize
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateCarousel();
        }, 250);
    });
});

// --- Eventos Carousel Logic ---

document.addEventListener('DOMContentLoaded', function() {
    const eventosTrack = document.getElementById('eventosCarouselTrack');
    const eventosLeftArrow = document.querySelector('.eventos-section .eventos-arrow.left-arrow');
    const eventosRightArrow = document.querySelector('.eventos-section .eventos-arrow.right-arrow');
    const eventosViewport = document.querySelector('.eventos-carousel-viewport');
    
    if (!eventosTrack || !eventosLeftArrow || !eventosRightArrow || !eventosViewport) return; 

    const eventosCards = eventosTrack.querySelectorAll('.evento-placeholder, .evento-destacado');
    const totalEventosCards = eventosCards.length;
    let eventosCurrentIndex = 0;
    
    // Cards now have fixed height in CSS, no need to calculate
    function setEventosEqualHeight() {
        // Fixed height is set in CSS, no dynamic calculation needed
        return;
    }
    
    // Calculate cards per view based on screen size
    function getEventosCardsPerView() {
        // Since cards are full width, always show 1 card per view
        return 1;
    }

    function updateEventosCarousel() {
        if (eventosCards.length === 0) return;
        
        const cardsPerView = getEventosCardsPerView();
        const maxIndex = Math.max(0, totalEventosCards - cardsPerView);
        
        // Calculate the translation distance (horizontal)
        const cardWidth = eventosCards[0].offsetWidth;
        const offset = -eventosCurrentIndex * cardWidth;
        eventosTrack.style.transform = `translateX(${offset}px)`;
        
        // Update arrow visibility
        eventosLeftArrow.disabled = eventosCurrentIndex === 0;
        eventosRightArrow.disabled = eventosCurrentIndex >= maxIndex;
        
        if (eventosLeftArrow.disabled) {
            eventosLeftArrow.style.opacity = '0.3';
            eventosLeftArrow.style.cursor = 'not-allowed';
        } else {
            eventosLeftArrow.style.opacity = '1';
            eventosLeftArrow.style.cursor = 'pointer';
        }
        
        if (eventosRightArrow.disabled) {
            eventosRightArrow.style.opacity = '0.3';
            eventosRightArrow.style.cursor = 'not-allowed';
        } else {
            eventosRightArrow.style.opacity = '1';
            eventosRightArrow.style.cursor = 'pointer';
        }
    }

    eventosLeftArrow.addEventListener('click', () => {
        if (eventosCurrentIndex > 0) {
            eventosCurrentIndex--;
            updateEventosCarousel();
        }
    });

    eventosRightArrow.addEventListener('click', () => {
        const cardsPerView = getEventosCardsPerView();
        const maxIndex = Math.max(0, totalEventosCards - cardsPerView);
        if (eventosCurrentIndex < maxIndex) {
            eventosCurrentIndex++;
            updateEventosCarousel();
        }
    });

    // Set equal heights and initial setup
    setEventosEqualHeight();
    updateEventosCarousel();
    
    // Recalculate on window resize
    let eventosResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(eventosResizeTimeout);
        eventosResizeTimeout = setTimeout(() => {
            setEventosEqualHeight();
            // Reset index if current position is invalid after resize
            const cardsPerView = getEventosCardsPerView();
            const maxIndex = Math.max(0, totalEventosCards - cardsPerView);
            if (eventosCurrentIndex > maxIndex) {
                eventosCurrentIndex = maxIndex;
            }
            updateEventosCarousel();
        }, 250);
    });
});