/**
 * Hovedskript for ditt nettsted
 * Forfatter: Ditt navn
 * Dato: 29.04.2025
 */

// Vent til DOM er ferdig lastet
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nettside lastet!');
    
    // Håndter mobil meny
    setupMobileMenu();
    
    // Legg til smooth scrolling til anker-lenker
    setupSmoothScrolling();
    
    // Aktiver tilbake-til-topp-knapp
    setupBackToTop();
    
    // Legg til animasjon på scroll for elementer
    setupScrollAnimations();
});

/**
 * Sett opp mobil meny funksjonalitet
 */
function setupMobileMenu() {
    // Dette kan utvides senere med en hamburger-meny for mobil
    // For nå har vi en enkel layout som bruker CSS for responsive endringer
    
    // Eksempel på hvordan man kan legge til en hamburger meny:
    // const navMenu = document.querySelector('nav ul');
    // const hamburgerBtn = document.createElement('button');
    // hamburgerBtn.classList.add('hamburger-btn');
    // hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
    // document.querySelector('header .container').appendChild(hamburgerBtn);
    
    // hamburgerBtn.addEventListener('click', function() {
    //     navMenu.classList.toggle('show');
    //     hamburgerBtn.classList.toggle('active');
    // });
}

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
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.setAttribute('aria-label', 'Gå til toppen av siden');
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
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Legg til stiler for knappen
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            z-index: 99;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--link-hover-color);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Sett opp animasjoner ved scroll
 */
function setupScrollAnimations() {
    // Velg alle elementer som skal animeres
    const animatedElements = document.querySelectorAll('.feature-item, .about-preview');
    
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
        .feature-item, .about-preview {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-item.animated, .about-preview.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-item:nth-child(3) {
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

/**
 * Hjelpefunksjon for å validere skjemaer
 * @param {HTMLFormElement} form - Skjemaet som skal valideres
 * @return {boolean} - Om skjemaet er gyldig
 */
function validateForm(form) {
    let isValid = true;
    
    // Reset tidligere feilmeldinger
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Sjekk alle påkrevde felt
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Dette feltet er påkrevd');
            isValid = false;
        }
    });
    
    // Sjekk e-post format hvis et e-postfelt finnes
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            showError(emailField, 'Vennligst oppgi en gyldig e-postadresse');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Vis feilmelding for et skjemafelt
 * @param {HTMLElement} field - Feltet som har feil
 * @param {string} message - Feilmeldingen som skal vises
 */
function showError(field, message) {
    // Opprett feilmelding-element
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    
    // Legg til etter feltet
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    
    // Merk feltet som ugyldig
    field.classList.add('invalid');
    
    // Fjern markering når brukeren begynner å rette opp
    field.addEventListener('input', function() {
        field.classList.remove('invalid');
        const error = field.parentNode.querySelector('.error-message');
        if (error) error.remove();
    });
}