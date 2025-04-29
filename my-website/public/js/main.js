/**
 * Hovedskript for TechNielsen nettsted
 * Dato: 30.04.2025
 */

// Vent til DOM er ferdig lastet
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechNielsen nettside lastet!');
    
    // Last inn header-komponenten
    loadHeaderComponent();
    
    // Legg til smooth scrolling til anker-lenker
    setupSmoothScrolling();
    
    // Aktiver tilbake-til-topp-knapp
    setupBackToTop();
    
    // Legg til animasjon på scroll for elementer
    setupScrollAnimations();
});

/**
 * Last inn header-komponenten 
 */
function loadHeaderComponent() {
    const headerPlaceholder = document.querySelector('.header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Set active class for current page
                const currentPage = window.location.pathname;
                let activeNavItem = 'nav-home';
                
                if (currentPage.includes('about.html')) {
                    activeNavItem = 'nav-about';
                } else if (currentPage.includes('services.html')) {
                    activeNavItem = 'nav-services';
                } else if (currentPage.includes('contact.html')) {
                    activeNavItem = 'nav-contact';
                }
                
                const navLink = document.getElementById(activeNavItem);
                if (navLink) {
                    navLink.classList.add('active');
                }
            })
            .catch(error => {
                console.error('Error loading header component:', error);
                headerPlaceholder.innerHTML = '<p>Kunne ikke laste header-komponenten</p>';
            });
    }
}