/**
 * Hovedskript for TechNielsen nettsted
 * Dato: 30.04.2025
 */

// Vent til DOM er ferdig lastet
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechNielsen nettside lastet!');
    
    // Legg til smooth scrolling til anker-lenker
    setupSmoothScrolling();
    
    // Aktiver tilbake-til-topp-knapp
    setupBackToTop();
    
    // Legg til animasjon på scroll for elementer
    setupScrollAnimations();
});

/**
 * Sett opp smooth scrolling for anker-lenker
 */
function setupSmoothScrolling() {
    // Velg alle interne lenker (de som starter med #)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Hindre standard oppførsel
            e.preventDefault();
            
            // Hent target-elementet
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Hopp over hvis det bare er en #
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll til elementet
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Sett opp tilbake-til-topp-knapp
 */
function setupBackToTop() {
    // Opprett knappen
    const backToTopBtn = document.createElement('a');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.setAttribute('aria-label', 'Gå til toppen av siden');
    backToTopBtn.setAttribute('href', '#');
    document.body.appendChild(backToTopBtn);
    
    // Vis/skjul knappen basert på scroll-posisjon
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll til toppen når knappen klikkes
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Sett opp animasjoner ved scroll
 */
function setupScrollAnimations() {
    // Velg alle elementer som skal animeres
    const animatedElements = document.querySelectorAll('.feature-item, .about-preview p, .service-card');
    
    // Funksjonen som sjekker om et element er synlig
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Funksjonen som utfører animasjonssjekken
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Legg til CSS-klassen for animasjoner
    const style = document.createElement('style');
    style.textContent = `
        .feature-item, .service-card, .about-preview p {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-item.animated, .service-card.animated, .about-preview p.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    
    // Kjør animasjonssjekken ved scroll og på pageload
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('load', checkAnimations);
    
    // Kjør animasjonssjekken en gang til starten for å fange opp elementer som er synlige ved lasting
    checkAnimations();
}