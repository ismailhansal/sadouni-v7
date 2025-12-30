// Optimisations mobiles pour améliorer le défilement
(function() {
    'use strict';

    // Vérifie si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) return; // Ne rien faire sur ordinateur

    // Fonction pour désactiver les animations
    function disableAnimations() {
        // Désactive les transitions CSS
        const style = document.createElement('style');
        style.textContent = `
            *, *:before, *:after {
                transition: none !important;
                animation: none !important;
                transform: none !important;
                opacity: 1 !important;
                transform-style: flat !important;
                backface-visibility: visible !important;
                perspective: none !important;
            }
            html, body {
                -webkit-overflow-scrolling: touch;
                overflow: auto;
                height: 100%;
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }

    // Optimise le défilement
    function optimizeScrolling() {
        // Désactive le zoom sur le double-tap
        document.documentElement.style.touchAction = 'manipulation';
        
        // Empêche le défilement de la page quand on interagit avec des éléments défilants
        document.addEventListener('touchstart', function(e) {
            if (e.target.closest('.scrollable')) {
                e.stopPropagation();
            }
        }, { passive: true });
    }

    // Désactive les effets de survol sur mobile
    function disableHoverEffects() {
        document.documentElement.classList.add('no-hover');
    }

    // Initialise les optimisations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            disableAnimations();
            optimizeScrolling();
            disableHoverEffects();
        });
    } else {
        disableAnimations();
        optimizeScrolling();
        disableHoverEffects();
    }
})();
