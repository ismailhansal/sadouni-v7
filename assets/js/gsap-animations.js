/**
 * Premium GSAP Animations for Dr. Sadouni Ophthalmology Website
 * Medical-grade, calm, and professional motion design
 * Respects prefers-reduced-motion
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only initialize if GSAP is available and user prefers motion
    if (typeof gsap === 'undefined' || prefersReducedMotion) {
        console.log('GSAP animations disabled - library not available or reduced motion preferred');
        return;
    }

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize all animations when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initPremiumAnimations();
    });

    function initPremiumAnimations() {
        try {
            multiLayerParallax();
            imageFocusTransition();
            scrollVelocityParallax();
            pinnedSectionMicroMovements();
            subtlePerspectiveDepth();
            magneticHoverEffect();
        } catch (error) {
            console.error('Error initializing GSAP animations:', error);
        }
    }

    /**
     * 1. Multi-layer Parallax Depth
     * Creates depth perception with different scroll speeds
     * Used in hero section for subtle, medical-grade depth
     */
    function multiLayerParallax() {
        const heroSection = document.querySelector('.cs_hero');
        if (!heroSection) return;

        // Subtle parallax layers for medical precision feel
        const parallaxElements = [
            { element: '.cs_hero_content_wrapper', speed: 0.3 },
            { element: '.cs_hero_info_box', speed: 0.2 },
            { element: '.cs_hero_shape_2', speed: 0.15 }
        ];

        parallaxElements.forEach(layer => {
            const element = document.querySelector(layer.element);
            if (element) {
                gsap.to(element, {
                    yPercent: -30 * layer.speed,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: heroSection,
                        start: "top top",
                        end: "bottom top",
                        scrub: 2.5,
                        invalidateOnRefresh: true
                    }
                });
            }
        });

        // Very subtle about section image parallax
        const aboutImages = document.querySelectorAll('.cs_about_thumbnail img');
        aboutImages.forEach((img, index) => {
            gsap.to(img, {
                yPercent: -10 * (index + 1),
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: '.cs_about',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 3
                }
            });
        });
    }

    /**
     * 2. Image Focus Transition
     * Eye-inspired blur to sharp focus effect on scroll
     * Applied to medical imagery with clinical precision
     */
    function imageFocusTransition() {
        const focusImages = document.querySelectorAll('.cs_about_thumbnail_1 img, .cs_testimonial_thumbnail img');
        
        focusImages.forEach(img => {
            // Set initial state - very subtle blur
            gsap.set(img, {
                filter: "blur(1.5px) brightness(0.95)",
                scale: 1.02
            });

            // Animate to focus on scroll - gradual and smooth
            gsap.to(img, {
                filter: "blur(0px) brightness(1)",
                scale: 1,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    end: "center 50%",
                    scrub: 1.5
                }
            });
        });
    }

    /**
     * 3. Scroll Velocity-based Parallax
     * Elements react gently to scroll speed
     * Applied to specialty cards with medical precision
     */
    function scrollVelocityParallax() {
        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        // Track scroll velocity with smoothing
        let velocityHistory = [];
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const instantVelocity = Math.abs(currentScrollY - lastScrollY);
            
            // Smooth velocity calculation
            velocityHistory.push(instantVelocity);
            if (velocityHistory.length > 5) velocityHistory.shift();
            scrollVelocity = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
            
            lastScrollY = currentScrollY;
        });

        // Apply very subtle velocity-based motion to cards
        const velocityElements = document.querySelectorAll('.property-card');
        
        velocityElements.forEach((element, index) => {
            gsap.set(element, {
                transformOrigin: "center center"
            });

            // Create a timeline for smooth velocity reactions
            const velocityTimeline = gsap.timeline({ paused: true });
            
            gsap.to(element, {
                y: () => scrollVelocity * 0.03 * (index % 2 === 0 ? -1 : 1),
                rotation: () => scrollVelocity * 0.005 * (index % 2 === 0 ? -1 : 1),
                duration: 0.6,
                ease: "power2.inOut",
                onUpdate: function() {
                    // Gentle reset when scrolling stops
                    if (scrollVelocity < 0.5) {
                        gsap.to(element, {
                            y: 0,
                            rotation: 0,
                            duration: 0.8,
                            ease: "power2.inOut"
                        });
                    }
                }
            });
        });
    }

    /**
     * 4. Pinned Section with Micro-movements
     * Very subtle floating motion for process cards
     * Medical precision with calm, reassuring movement
     */
    function pinnedSectionMicroMovements() {
        const processCards = document.querySelectorAll('.cs_card.cs_style_5');
        
        processCards.forEach((card, index) => {
            // Extremely subtle floating animation - medical precision
            gsap.to(card, {
                y: "random(-2, 2)",
                rotation: "random(-0.2, 0.2)",
                duration: "random(4, 6)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });

            // Enhanced scroll animation - medical-grade reveal
            gsap.fromTo(card, 
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "bottom 70%",
                        scrub: 1.5
                    }
                }
            );
        });
    }

    /**
     * 5. Subtle Perspective Depth
     * Light 3D translate effects without rotation
     * Applied to sections with medical precision
     */
    function subtlePerspectiveDepth() {
        const depthSections = document.querySelectorAll('.specialites, .cs_testimonial');
        
        depthSections.forEach(section => {
            gsap.set(section, {
                transformPerspective: 1200
            });

            // Very gentle Z-axis movement for depth
            gsap.fromTo(section,
                {
                    z: -50,
                    opacity: 0.9
                },
                {
                    z: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "center 60%",
                        scrub: 2
                    }
                }
            );
        });

        // Apply to info boxes with medical precision
        const infoBoxes = document.querySelectorAll('.cs_info_item');
        infoBoxes.forEach((box, index) => {
            gsap.to(box, {
                z: 25 * (index + 1),
                duration: 2.5,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: box,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2.5
                }
            });
        });
    }

    /**
     * 6. Magnetic Hover Effect (Optional)
     * Applied to primary CTA buttons with medical precision
     * Very subtle magnetic pull for professional feel
     */
    function magneticHoverEffect() {
        const magneticButtons = document.querySelectorAll('.cs_btn.cs_style_1');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Very subtle magnetic effect
                gsap.to(button, {
                    x: x * 0.08,
                    y: y * 0.08,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            });

            button.addEventListener('mouseleave', function() {
                // Smooth return to center
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            });

            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Gentle follow with reduced intensity
                gsap.to(button, {
                    x: x * 0.08,
                    y: y * 0.08,
                    duration: 0.15,
                    ease: "power2.out"
                });
            });
        });
    }

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });

})();
