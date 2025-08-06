document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.logo-splash');
    const mainContent = document.querySelector('.container');
    
    setTimeout(() => {
        splash.classList.add('splash-transition');
        
        mainContent.classList.add('main-content');
        
        setTimeout(() => {
            splash.classList.add('splash-removed');
            initAnimations();
        }, 2000);
        
    }, 1200); 
    
    function initAnimations() {
        ScrollReveal().reveal('.card', {
            delay: 200,
            distance: '30px',
            origin: 'bottom',
            duration: 800,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            interval: 150
        });
    }
});
