document.addEventListener('DOMContentLoaded', function() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        delay: 200,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0,
        scale: 1,
        mobile: true
    });

    sr.reveal('.card', { 
        interval: 200,
        beforeReveal: (el) => {
            el.style.opacity = 1;
        }
    });

    ScrollReveal().reveal('.header-content', {
        delay: 300,
        distance: '60px',
        origin: 'top',
        opacity: 0,
        easing: 'ease-out'
    });

    ScrollReveal().reveal('.about-item', {
        interval: 150,
        origin: 'left',
        distance: '30px'
    });

    ScrollReveal().reveal('.category:nth-child(odd)', {
        origin: 'left',
        distance: '50px'
    });
    ScrollReveal().reveal('.category:nth-child(even)', {
        origin: 'right',
        distance: '50px'
    });

    ScrollReveal().reveal('.project-card', {
        interval: 200,
        origin: 'bottom',
        distance: '40px',
        scale: 0.95
    });
});
