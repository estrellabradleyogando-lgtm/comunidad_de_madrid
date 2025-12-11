// ========================================
// HAMBURGER MENU with jQuery
// ========================================
$(document).ready(function () {
    const $hamburger = $('#hamburger');
    const $navMenu = $('#navMenu');
    const $body = $('body');

    function setMenuState(isOpen) {
        $hamburger.toggleClass('active', isOpen);
        $navMenu.toggleClass('active', isOpen);
        $body.toggleClass('menu-open', isOpen);
        $hamburger.attr('aria-expanded', String(isOpen));
        $hamburger.attr('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    }

    // Toggle menu on click
    $hamburger.on('click', function() {
        const willOpen = !$navMenu.hasClass('active');
        setMenuState(willOpen);
    });

    // Keyboard support
    $hamburger.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const willOpen = !$navMenu.hasClass('active');
            setMenuState(willOpen);
        }
    });

    // Close on Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $navMenu.hasClass('active')) {
            setMenuState(false);
        }
    });

    // Close when clicking nav links
    $navMenu.find('a').on('click', function() {
        setMenuState(false);
    });

    // Close when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#hamburger, #navMenu').length) {
            if ($navMenu.hasClass('active')) {
                setMenuState(false);
            }
        }
    });
});

// ========================================
// SMOOTH SCROLLING with jQuery
// ========================================
$(document).ready(function() {
    $('a[href*="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        
        // Only handle same-page anchor links
        if (href.includes('#') && (href.startsWith('#') || href.includes(window.location.pathname.split('/').pop()))) {
            e.preventDefault();
            
            const hash = href.includes('#') ? href.split('#')[1] : '';
            const $target = $('#' + hash);
            
            if ($target.length) {
                const navbarHeight = $('.navbar').outerHeight() || 0;
                const targetPosition = $target.offset().top - navbarHeight;
                
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 500);
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, '#' + hash);
                }
            }
        }
    });
});

// ========================================
// CHART.JS (No jQuery needed here)
// ========================================
const etiquetas = [
    '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'
];

const datos = {
    labels: etiquetas,
    datasets: [{
        label: 'CO₂ emitido (toneladas)',
        data: [100, 94, 80, 78, 75, 60, 63, 50, 48, 30, 20],
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1
    }]
};

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

$(window).on('load', function() {
    const ctx = document.getElementById('Chart');
    if (ctx) {
        new Chart(ctx, config);
    }
});

// ========================================
// NEWS CAROUSEL with jQuery
// ========================================
$(document).ready(function() {
    const $track = $('#cardCarouselTrack');
    const $leftArrow = $('.articulo-container .left-arrow');
    const $rightArrow = $('.articulo-container .right-arrow');
    const $viewport = $('.articulo-container .carousel-viewport');
    
    if (!$track.length || !$leftArrow.length || !$rightArrow.length || !$viewport.length) return;

    const $cards = $track.find('.articulo-card');
    const totalCards = $cards.length;
    if (totalCards === 0) return;
    
    function getGap() {
        return window.innerWidth <= 768 ? 0 : 30;
    }
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) {
            return 1; // Always show 1 card on mobile
        }
        const viewportWidth = $viewport.width();
        const cardWidth = $cards.first().outerWidth();
        const gap = getGap();
        return Math.floor((viewportWidth + gap) / (cardWidth + gap)) || 1;
    }
    
    // Clone cards for infinite loop
    const cardsPerView = getCardsPerView();
    const clonesToAdd = Math.max(cardsPerView, 2);
    
    // Clone first cards and append to end
    for (let i = 0; i < clonesToAdd; i++) {
        const $clone = $cards.eq(i).clone().addClass('clone');
        $track.append($clone);
    }
    
    // Clone last cards and prepend to beginning
    for (let i = totalCards - clonesToAdd; i < totalCards; i++) {
        const $clone = $cards.eq(i).clone().addClass('clone');
        $track.prepend($clone);
    }
    
    // Re-query all cards including clones
    const $allCards = $track.find('.articulo-card');
    
    // Start at the first real card
    let currentIndex = clonesToAdd;
    $track.css('transition', 'transform 0.5s ease');
    
    function updateCarousel(instant = false) {
        if (instant) {
            $track.css('transition', 'none');
        } else {
            $track.css('transition', 'transform 0.5s ease');
        }
        
        const cardWidth = $allCards.first().outerWidth();
        const gap = getGap();
        const offset = -currentIndex * (cardWidth + gap);
        $track.css('transform', `translateX(${offset}px)`);
        
        $leftArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
        $rightArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
    }
    
    function jumpToRealCard() {
        if (currentIndex < clonesToAdd) {
            currentIndex = totalCards + clonesToAdd;
            updateCarousel(true);
            setTimeout(() => updateCarousel(false), 50);
        } else if (currentIndex >= totalCards + clonesToAdd) {
            currentIndex = clonesToAdd;
            updateCarousel(true);
            setTimeout(() => updateCarousel(false), 50);
        }
    }

    $leftArrow.on('click', function() {
        currentIndex--;
        updateCarousel();
        setTimeout(jumpToRealCard, 500);
    });

    $rightArrow.on('click', function() {
        currentIndex++;
        updateCarousel();
        setTimeout(jumpToRealCard, 500);
    });

    updateCarousel(true);
    setTimeout(() => updateCarousel(false), 50);
    
    // Recalculate on window resize
    let resizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
});

// ========================================
// EVENTOS CAROUSEL with jQuery
// ========================================
$(document).ready(function() {
    const $eventosTrack = $('#eventosCarouselTrack');
    const $eventosLeftArrow = $('.eventos-section .eventos-arrow.left-arrow');
    const $eventosRightArrow = $('.eventos-section .eventos-arrow.right-arrow');
    const $eventosViewport = $('.eventos-carousel-viewport');
    
    if (!$eventosTrack.length || !$eventosLeftArrow.length || !$eventosRightArrow.length || !$eventosViewport.length) return;

    const $eventosCards = $eventosTrack.find('.evento-placeholder, .evento-destacado');
    const totalEventosCards = $eventosCards.length;
    if (totalEventosCards === 0) return;
    
    // Clone first and last cards
    const $firstCard = $eventosCards.first().clone().addClass('clone');
    $eventosTrack.append($firstCard);
    
    const $lastCard = $eventosCards.last().clone().addClass('clone');
    $eventosTrack.prepend($lastCard);
    
    const $allEventosCards = $eventosTrack.find('.evento-placeholder, .evento-destacado');
    const cardWidth = $allEventosCards.first().outerWidth();
    
    let eventosCurrentIndex = 1;
    $eventosTrack.css('transition', 'transform 0.5s ease');
    
    function updateEventosCarousel(instant = false) {
        if (instant) {
            $eventosTrack.css('transition', 'none');
        } else {
            $eventosTrack.css('transition', 'transform 0.5s ease');
        }
        
        const offset = -eventosCurrentIndex * cardWidth;
        $eventosTrack.css('transform', `translateX(${offset}px)`);
        
        $eventosLeftArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
        $eventosRightArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
    }
    
    function jumpToRealEventoCard() {
        if (eventosCurrentIndex === 0) {
            eventosCurrentIndex = totalEventosCards;
            updateEventosCarousel(true);
            setTimeout(() => updateEventosCarousel(false), 50);
        } else if (eventosCurrentIndex > totalEventosCards) {
            eventosCurrentIndex = 1;
            updateEventosCarousel(true);
            setTimeout(() => updateEventosCarousel(false), 50);
        }
    }

    $eventosLeftArrow.on('click', function() {
        eventosCurrentIndex--;
        updateEventosCarousel();
        setTimeout(jumpToRealEventoCard, 500);
    });

    $eventosRightArrow.on('click', function() {
        eventosCurrentIndex++;
        updateEventosCarousel();
        setTimeout(jumpToRealEventoCard, 500);
    });

    updateEventosCarousel(true);
    setTimeout(() => updateEventosCarousel(false), 50);
    
    let eventosResizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(eventosResizeTimeout);
        eventosResizeTimeout = setTimeout(() => {
            updateEventosCarousel();
        }, 250);
    });
});

// ========================================
// VISITAS CAROUSEL with jQuery
// ========================================
$(document).ready(function() {
    const $visitasTrack = $('#visitasCarouselTrack');
    const $visitasLeftArrow = $('.visitas-section .visitas-arrow.left-arrow');
    const $visitasRightArrow = $('.visitas-section .visitas-arrow.right-arrow');
    const $visitasViewport = $('.visitas-carousel-viewport');
    
    if (!$visitasTrack.length || !$visitasLeftArrow.length || !$visitasRightArrow.length || !$visitasViewport.length) return;

    const $visitasCards = $visitasTrack.find('.visita-card');
    const totalVisitasCards = $visitasCards.length;
    if (totalVisitasCards === 0) return;
    
    const viewportWidth = $visitasViewport.width();
    const cardWidth = $visitasCards.first().outerWidth();
    const gap = 30;
    const cardsPerView = Math.floor((viewportWidth + gap) / (cardWidth + gap)) || 1;
    const clonesToAdd = Math.max(cardsPerView, 2);
    
    // Clone first cards and append to end
    for (let i = 0; i < clonesToAdd; i++) {
        const $clone = $visitasCards.eq(i).clone().addClass('clone');
        $visitasTrack.append($clone);
    }
    
    // Clone last cards and prepend to beginning
    for (let i = totalVisitasCards - clonesToAdd; i < totalVisitasCards; i++) {
        const $clone = $visitasCards.eq(i).clone().addClass('clone');
        $visitasTrack.prepend($clone);
    }
    
    const $allVisitasCards = $visitasTrack.find('.visita-card');
    const newCardWidth = $allVisitasCards.first().outerWidth();
    
    let visitasCurrentIndex = clonesToAdd;
    $visitasTrack.css('transition', 'transform 0.5s ease');
    
    function updateVisitasCarousel(instant = false) {
        if (instant) {
            $visitasTrack.css('transition', 'none');
        } else {
            $visitasTrack.css('transition', 'transform 0.5s ease');
        }
        
        const offset = -visitasCurrentIndex * (newCardWidth + gap);
        $visitasTrack.css('transform', `translateX(${offset}px)`);
        
        $visitasLeftArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
        $visitasRightArrow.css({ 'opacity': '1', 'cursor': 'pointer' });
    }
    
    function jumpToRealVisitaCard() {
        if (visitasCurrentIndex < clonesToAdd) {
            visitasCurrentIndex = totalVisitasCards + clonesToAdd;
            updateVisitasCarousel(true);
            setTimeout(() => updateVisitasCarousel(false), 50);
        } else if (visitasCurrentIndex >= totalVisitasCards + clonesToAdd) {
            visitasCurrentIndex = clonesToAdd;
            updateVisitasCarousel(true);
            setTimeout(() => updateVisitasCarousel(false), 50);
        }
    }

    $visitasLeftArrow.on('click', function() {
        visitasCurrentIndex--;
        updateVisitasCarousel();
        setTimeout(jumpToRealVisitaCard, 500);
    });

    $visitasRightArrow.on('click', function() {
        visitasCurrentIndex++;
        updateVisitasCarousel();
        setTimeout(jumpToRealVisitaCard, 500);
    });

    updateVisitasCarousel(true);
    setTimeout(() => updateVisitasCarousel(false), 50);
    
    let visitasResizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(visitasResizeTimeout);
        visitasResizeTimeout = setTimeout(() => {
            updateVisitasCarousel();
        }, 250);
    });
});